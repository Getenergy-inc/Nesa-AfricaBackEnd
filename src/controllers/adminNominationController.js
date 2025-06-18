import Nomination from "../models/postgresql/Nomination.js";
import { Op } from "sequelize";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import fs from "fs";
import { fn, col, literal } from "sequelize";
import { Sequelize } from 'sequelize';





// Get Admin Nomination Dashboard Data
export const getNominationDashboardStats = async (req, res) => {
  try {
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const totalNominations = await Nomination.count();
    const totalAccepted = await Nomination.count({ where: { status: "accepted" } });
    const totalPending = await Nomination.count({ where: { status: "pending" } });

    const nominationList = await Nomination.findAll({
      attributes: [
        "name",
        "email",
        "category",
        "subCategory",
        "status",
        "createdAt",
        "updatedAt",
        [fn("COUNT", col("email")), "nominationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["email", "name", "category", "subCategory", "status", "createdAt", "updatedAt"], // ✅ Fix here
      order: [[fn("MAX", col("createdAt")), sortOrder]],
    });

    const formattedList = nominationList.map((nom) => ({
      fullName: nom.name,
      email: nom.email,
      category: nom.category,
      subCategory: nom.subCategory,
      status: nom.status === "accepted" ? "Accepted" : "Pending",
      createdAt: nom.createdAt,
      updatedAt: nom.updatedAt,
      nominationCount: nom.get("nominationCount"),
      latestCreatedAt: nom.get("latestCreatedAt"),
    }));

    return res.status(200).json({
      totalNominations,
      totalAccepted,
      totalPending,
      nominations: formattedList,
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const getPaginatedNominations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const groupedNominations = await Nomination.findAll({
      attributes: [
        "name",
        "email",
        "category",
        "subCategory",
        "status",
        [fn("COUNT", col("email")), "nominationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["name", "email", "category", "subCategory", "status"], // ✅ Added "category" here
      order: [[fn("MAX", col("createdAt")), sortOrder]],
      offset,
      limit,
    });

    const totalItems = await Nomination.count({
      distinct: true,
      col: "email",
    });

    const data = groupedNominations.map((nom) => ({
      fullName: nom.name,
      email: nom.email,
      category: nom.category,
      subCategory: nom.subCategory,
      status: nom.status,
      nominationCount: nom.get("nominationCount"),
      latestCreatedAt: nom.get("latestCreatedAt"),
    }));

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      nominations: data,
    });
  } catch (error) {
    console.error("Pagination Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const searchNominations = async (req, res) => {
  try {
    const { category, subCategory, email, sortOrder } = req.query;
    const sortDirection = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const filters = {};
    if (category) filters.category = { [Op.iLike]: `%${category}%` };
    if (subCategory) filters.subCategory = { [Op.iLike]: `%${subCategory}%` };
    if (email) filters.email = { [Op.iLike]: `%${email}%` };

    const nominations = await Nomination.findAll({
      where: filters,
      attributes: [
        "name",
        "email",
        "category",
        "subCategory",
        "status",
        [fn("COUNT", col("email")), "nominationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["name", "email", "category", "subCategory", "status"], // 🛠️ Include "category" here
      order: [[fn("MAX", col("createdAt")), sortDirection]],
    });

    const data = nominations.map((n) => ({
      name: n.name,
      email: n.email,
      category: n.category,
      subCategory: n.subCategory,
      status: n.status,
      nominationCount: n.get("nominationCount"),
      latestCreatedAt: n.get("latestCreatedAt"),
    }));

    return res.status(200).json({ total: data.length, nominations: data });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const exportNominations = async (req, res) => {
  try {
    const format = req.query.format || "csv";
    const { status, category, subCategory, startDate, endDate } = req.query;
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = { [Op.iLike]: `%${category}%` };
    if (subCategory) filters.subCategory = { [Op.iLike]: `%${subCategory}%` };
    if (startDate && endDate) {
      filters.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const nominations = await Nomination.findAll({
      where: filters,
      attributes: ["name", "email", "category", "subCategory", "status", "createdAt"],
      order: [["createdAt", sortOrder]], // ✅ Fixed here
    });

    const emails = nominations.map((n) => n.email);

    const counts = await Nomination.findAll({
      where: { email: { [Op.in]: emails } },
      attributes: ["email", [fn("COUNT", col("email")), "count"]],
      group: ["email"],
      raw: true,
    });

    const countMap = {};
    counts.forEach((item) => {
      countMap[item.email] = item.count;
    });

    const data = nominations.map((n) => ({
      name: n.name,
      email: n.email,
      category: n.category,
      subCategory: n.subCategory,
      status: n.status,
      nominationCount: countMap[n.email] || 1,
      createdAt: n.createdAt,
    }));

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Nominations");

      worksheet.columns = [
        { header: "Name", key: "name" },
        { header: "Email", key: "email" },
        { header: "Category", key: "category" },
        { header: "SubCategory", key: "subCategory" },
        { header: "Status", key: "status" },
        { header: "Nomination Count", key: "nominationCount" },
        { header: "Created At", key: "createdAt" },
      ];

      worksheet.addRows(data);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=nominations.xlsx");

      await workbook.xlsx.write(res);
      res.end();
    } else {
      const parser = new Parser({
        fields: ["name", "email", "category", "subCategory", "status", "nominationCount", "createdAt"],
      });
      const csv = parser.parse(data);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=nominations.csv");
      res.status(200).send(csv);
    }
  } catch (error) {
    console.error("Export Error:", error);
    res.status(500).json({ message: "Export failed" });
  }
};

// GET /api/nomination/chart/timeline?interval=daily|weekly|monthly
export const getNominationTimelineChart = async (req, res) => {
  try {
    const interval = req.query.interval || "daily"; // daily, weekly, monthly
    let format = "%Y-%m-%d"; // default: daily

    if (interval === "weekly") format = "%Y-%u"; // year + week number
    if (interval === "monthly") format = "%Y-%m"; // year + month

    const nominations = await Nomination.findAll({
      attributes: [
        [Sequelize.fn("to_char", Sequelize.col("createdAt"), format), "period"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["period"],
      order: [[Sequelize.literal("period"), "ASC"]],
      raw: true,
    });

    const data = nominations.map((row) => ({
      period: row.period,
      count: parseInt(row.count),
    }));

    return res.status(200).json({ interval, data });
  } catch (error) {
    console.error("Timeline Chart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET /api/nomination/chart/grouped?groupBy=status|subCategory
export const getNominationGroupedPieChart = async (req, res) => {
  try {
    const groupBy = req.query.groupBy || "status"; // default: status

    const nominations = await Nomination.findAll({
      attributes: [
        [Sequelize.col(groupBy), "label"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [groupBy],
      raw: true,
    });

    const data = nominations.map((row) => ({
      label: row.label || "Unknown",
      value: parseInt(row.count),
    }));

    return res.status(200).json({ groupBy, data });
  } catch (error) {
    console.error("Pie Chart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET /api/nomination/sort?order=asc|desc
export const getSortedNominations = async (req, res) => {
  try {
    const order = req.query.order === "asc" ? "ASC" : "DESC";

    const nominations = await Nomination.findAll({
      attributes: [
        "name",
        "email",
        "category",
        "subCategory",
        "status",
        "createdAt",
        [fn("COUNT", col("email")), "nominationCount"]
      ],
      group: ["name", "email", "subCategory", "status", "createdAt"],
      order: [["createdAt", order]],
    });

    const formatted = nominations.map((n) => ({
      fullName: n.name,
      email: n.email,
      category:n.category,
      subCategory: n.subCategory,
      status: n.status,
      nominationCount: n.get("nominationCount"),
      createdAt: n.createdAt,
    }));

    return res.status(200).json({ sortOrder: order, nominations: formatted });
  } catch (error) {
    console.error("Sort API Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



/**
 * Get a single nomination form by ID
 */
export const getNominationById = async (req, res) => {
  const { id } = req.params;

  try {
    const nomination = await Nomination.findByPk(id);

    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: "Nomination not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Nomination retrieved successfully",
      data: {
        id: nomination.id,
        name: nomination.name,
        email: nomination.email,
        category: nomination.category,
        categoryType: nomination.categoryType,
        subCategory: nomination.subCategory,
        achievements: nomination.achievements,
        document: nomination.document,
        status: nomination.status,
        createdAt: nomination.createdAt,
        updatedAt: nomination.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching nomination:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving nomination",
    });
  }
};