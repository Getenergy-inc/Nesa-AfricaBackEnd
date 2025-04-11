import * as VolunteerService from "../services/volunteer.service.js";



export const createVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerService.createVolunteer(req.body);
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await VolunteerService.getAllVolunteers();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await VolunteerService.getVolunteerById(req.params.id);
    res.json(volunteer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerService.updateVolunteer(req.params.id, req.body);
    res.json(volunteer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteVolunteer = async (req, res) => {
  try {
    const result = await VolunteerService.deleteVolunteer(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
