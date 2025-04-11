import * as StaffService from "../services/staff.service.js";



export const createStaff = async (req, res) => {
  try {
    const staff = await StaffService.createStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllStaff = async (req, res) => {
  try {
    const staffList = await StaffService.getAllStaff();
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getStaffById = async (req, res) => {
  try {
    const staff = await StaffService.getStaffById(req.params.id);
    res.json(staff);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateStaff = async (req, res) => {
  try {
    const updated = await StaffService.updateStaff(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteStaff = async (req, res) => {
  try {
    const result = await StaffService.deleteStaff(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
