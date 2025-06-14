import * as JudgeService from "../services/judge.service.js";




export const createJudge = async (req, res) => {
  try {
    const judge = await JudgeService.createJudge(req.body);
    res.status(201).json(judge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllJudges = async (req, res) => {
  try {
    const judges = await JudgeService.getAllJudges();
    res.json(judges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getJudgeById = async (req, res) => {
  try {
    const judge = await JudgeService.getJudgeById(req.params.id);
    res.json(judge);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateJudge = async (req, res) => {
  try {
    const judge = await JudgeService.updateJudge(req.params.id, req.body);
    res.json(judge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteJudge = async (req, res) => {
  try {
    const result = await JudgeService.deleteJudge(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

