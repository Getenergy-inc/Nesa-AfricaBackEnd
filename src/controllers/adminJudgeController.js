import Applicant from "../models/postgresql/Applicant.js";
import { fn, col } from "sequelize";
import { Op } from "sequelize";
import ExcelJS from "exceljs";
import { Parser } from "json2csv";
import { Sequelize } from "sequelize";
import JudgeApproved from "../utils/JudgeApproved.js";


export const getJudgeDashboardStats = async (req, res) => {
  try {
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const totalApplications = await Applicant.count();
    const totalAccepted = await Applicant.count({ where: { status: "accepted" } });
    const totalPending = await Applicant.count({ where: { status: "pending" } });
    const totalDenied = await Applicant.count({ where: { status: "denied" } }); // ✅ Denied applications

    const applicantsList = await Applicant.findAll({
      attributes: [
        "full_name",
        "email",
        "phone_number",
        "state_and_region",
        "status",
        "createdAt",
        "updatedAt",
        [fn("COUNT", col("email")), "applicationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["full_name", "email", "phone_number", "state_and_region", "status", "createdAt", "updatedAt"],
      order: [[fn("MAX", col("createdAt")), sortOrder]],
    });

    const formattedList = applicantsList.map((app) => ({
      fullName: app.full_name,
      email: app.email,
      phoneNumber: app.phone_number,
      region: app.state_and_region,
      status: app.status === "accepted" ? "Accepted" :
              app.status === "denied" ? "Denied" : "Pending",
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      applicationCount: app.get("applicationCount"),
      latestCreatedAt: app.get("latestCreatedAt"),
    }));

    return res.status(200).json({
      totalApplications,
      totalAccepted,
      totalPending,
      totalDenied,
      applicants: formattedList,
    });

  } catch (error) {
    console.error("Judge Dashboard Fetch Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const getPaginatedApplicants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const groupedApplicants = await Applicant.findAll({
      attributes: [
        "full_name",
        "email",
        "phone_number",
        "state_and_region",
        "status",
        [fn("COUNT", col("email")), "applicationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["full_name", "email", "phone_number", "state_and_region", "status"],
      order: [[fn("MAX", col("createdAt")), sortOrder]],
      offset,
      limit,
    });

    const totalItems = await Applicant.count({
      distinct: true,
      col: "email",
    });

    const data = groupedApplicants.map((applicant) => ({
      fullName: applicant.full_name,
      email: applicant.email,
      phoneNumber: applicant.phone_number,
      stateAndRegion: applicant.state_and_region,
      status: applicant.status,
      applicationCount: applicant.get("applicationCount"),
      latestCreatedAt: applicant.get("latestCreatedAt"),
    }));

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      applicants: data,
    });
  } catch (error) {
    console.error("Pagination Error (Applicants):", error);
    return res.status(500).json({ message: "Server Error" });
  }
};




export const searchApplicants = async (req, res) => {
  try {
    const { email, state_and_region, status, sortOrder } = req.query;
    const sortDirection = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const filters = {};
    if (email) filters.email = { [Op.iLike]: `%${email}%` };
    if (state_and_region) filters.state_and_region = { [Op.iLike]: `%${state_and_region}%` };
    if (status) filters.status = status;

    const applicants = await Applicant.findAll({
      where: filters,
      attributes: [
        "full_name",
        "email",
        "phone_number",
        "state_and_region",
        "status",
        [fn("COUNT", col("email")), "applicationCount"],
        [fn("MAX", col("createdAt")), "latestCreatedAt"]
      ],
      group: ["full_name", "email", "phone_number", "state_and_region", "status"],
      order: [[fn("MAX", col("createdAt")), sortDirection]],
    });

    const data = applicants.map((applicant) => ({
      fullName: applicant.full_name,
      email: applicant.email,
      phoneNumber: applicant.phone_number,
      stateAndRegion: applicant.state_and_region,
      status: applicant.status,
      applicationCount: applicant.get("applicationCount"),
      latestCreatedAt: applicant.get("latestCreatedAt"),
    }));

    return res.status(200).json({
      total: data.length,
      applicants: data,
    });
  } catch (error) {
    console.error("Search Applicants Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const exportApplications = async (req, res) => {
  try {
    const format = req.query.format || "csv";
    const { status, state_and_region, startDate, endDate } = req.query;
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const filters = {};
    if (status) filters.status = status;
    if (state_and_region) filters.state_and_region = { [Op.iLike]: `%${state_and_region}%` };
    if (startDate && endDate) {
      filters.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const applicants = await Applicant.findAll({
      where: filters,
      attributes: [
        "full_name",
        "email",
        "phone_number",
        "state_and_region",
        "status",
        "createdAt",
      ],
      order: [["createdAt", sortOrder]],
    });

    const emails = applicants.map((a) => a.email);

    const counts = await Applicant.findAll({
      where: { email: { [Op.in]: emails } },
      attributes: ["email", [fn("COUNT", col("email")), "count"]],
      group: ["email"],
      raw: true,
    });

    const countMap = {};
    counts.forEach((item) => {
      countMap[item.email] = item.count;
    });

    const data = applicants.map((a) => ({
      fullName: a.full_name,
      email: a.email,
      phoneNumber: a.phone_number,
      stateAndRegion: a.state_and_region,
      status: a.status,
      applicationCount: countMap[a.email] || 1,
      createdAt: a.createdAt,
    }));

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Applications");

      worksheet.columns = [
        { header: "Full Name", key: "fullName" },
        { header: "Email", key: "email" },
        { header: "Phone Number", key: "phoneNumber" },
        { header: "State and Region", key: "stateAndRegion" },
        { header: "Status", key: "status" },
        { header: "Application Count", key: "applicationCount" },
        { header: "Created At", key: "createdAt" },
      ];

      worksheet.addRows(data);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=applications.xlsx");

      await workbook.xlsx.write(res);
      res.end();
    } else {
      const parser = new Parser({
        fields: [
          "fullName",
          "email",
          "phoneNumber",
          "stateAndRegion",
          "status",
          "applicationCount",
          "createdAt",
        ],
      });
      const csv = parser.parse(data);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=applications.csv");
      res.status(200).send(csv);
    }
  } catch (error) {
    console.error("Export Applications Error:", error);
    res.status(500).json({ message: "Export failed" });
  }
};


export const getApplicationTimelineChart = async (req, res) => {
  try {
    const interval = req.query.interval || "daily"; // Options: daily, weekly, monthly
    let format = "%Y-%m-%d"; // Default for daily

    if (interval === "weekly") format = "%Y-%u"; // Year + week number
    if (interval === "monthly") format = "%Y-%m"; // Year + month

    const applications = await Applicant.findAll({
      attributes: [
        [Sequelize.fn("to_char", Sequelize.col("createdAt"), format), "period"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["period"],
      order: [[Sequelize.literal("period"), "ASC"]],
      raw: true,
    });

    const data = applications.map((row) => ({
      period: row.period,
      count: parseInt(row.count),
    }));

    return res.status(200).json({ interval, data });
  } catch (error) {
    console.error("Application Timeline Chart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getApplicationGroupedChart = async (req, res) => {
  try {
    const groupBy = req.query.groupBy || "status"; // e.g., status, state_and_region, education_background

    const applications = await Applicant.findAll({
      attributes: [
        [Sequelize.col(groupBy), "label"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [groupBy],
      raw: true,
    });

    const data = applications.map((row) => ({
      label: row.label || "Unknown",
      value: parseInt(row.count),
    }));

    return res.status(200).json({ groupBy, data }); // frontend decides pie or bar chart
  } catch (error) {
    console.error("Application Grouped Chart Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const getSortedApplications = async (req, res) => {
  try {
    const order = req.query.order === "asc" ? "ASC" : "DESC";

    const applications = await Applicant.findAll({
      attributes: [
        "full_name",
        "email",
        "phone_number",
        "status",
        "state_and_region",
        "createdAt",
        [fn("COUNT", col("email")), "applicationCount"]
      ],
      group: [
        "full_name",
        "email",
        "phone_number",
        "status",
        "state_and_region",
        "createdAt"
      ],
      order: [["createdAt", order]],
    });

    const formatted = applications.map((app) => ({
      fullName: app.full_name,
      email: app.email,
      phoneNumber: app.phone_number,
      status: app.status,
      stateAndRegion: app.state_and_region,
      applicationCount: app.get("applicationCount"),
      createdAt: app.createdAt,
    }));

    return res.status(200).json({
      sortOrder: order,
      applications: formatted,
    });
  } catch (error) {
    console.error("Sort Applications Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




export const approveJudgeApplication = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Applicant ID is required" });
  }

  try {
    // Check if applicant exists
    const applicant = await Applicant.findByPk(id);

    if (!applicant) {
      return res.status(404).json({ success: false, message: "Applicant not found" });
    }

    // Approve using reusable method
    const result = await JudgeApproved.JudgeApproved(id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: "Judge application approved successfully.",
      id: result.id,
    });
  } catch (error) {
    console.error("Approval error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while approving application",
    });
  }
};



/**
 * Get a single judge application by ID
 */
export const getJudgeApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const applicant = await Applicant.findByPk(id);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Judge application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Judge application retrieved successfully",
      data: {
        id: applicant.id,
        fullName: applicant.full_name,
        email: applicant.email,
        phoneNumber: applicant.phone_number,
        region: applicant.state_and_region,
        status: applicant.status,
        motivationStatement: applicant.motivation_statement,
        experience: applicant.experience,
        educationBackground: applicant.education_background,
        profileImage: applicant.upload_profile_image,
        document: applicant.upload_document,
        judgeId: applicant.judge_id,
        createdAt: applicant.createdAt,
        updatedAt: applicant.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching judge application:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving judge application",
    });
  }
};