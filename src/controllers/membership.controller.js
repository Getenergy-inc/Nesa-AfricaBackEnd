import * as MembershipService from "../services/membership.service.js";




export const createMembership = async (req, res) => {
  try {
    const membership = await MembershipService.createMembership(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await MembershipService.getAllMemberships();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMembershipById = async (req, res) => {
  try {
    const membership = await MembershipService.getMembershipById(req.params.id);
    res.json(membership);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateMembership = async (req, res) => {
  try {
    const membership = await MembershipService.updateMembership(req.params.id, req.body);
    res.json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




export const deleteMembership = async (req, res) => {
  try {
    const result = await MembershipService.deleteMembership(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
