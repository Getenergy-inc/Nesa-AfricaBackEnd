import * as AmbassadorService from "../services/AmbassadorService.js";

export const create = async (req, res) => {
  try {
    const ambassador = await AmbassadorService.createAmbassador(req.body);
    res.status(201).json(ambassador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const ambassadors = await AmbassadorService.getAllAmbassadors();
    res.json(ambassadors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const ambassador = await AmbassadorService.getAmbassadorById(req.params.id);
    res.json(ambassador);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const ambassador = await AmbassadorService.updateAmbassador(req.params.id, req.body);
    res.json(ambassador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await AmbassadorService.deleteAmbassador(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
