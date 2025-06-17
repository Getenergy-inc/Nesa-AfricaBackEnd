import * as JudgeService from "../services/judge.service.js";
import Applicant from "../models/postgresql/Applicant.js";
import Judge from "../models/postgresql/Judge.js";
import ApplicantLink from "../utils/ApplicantLink.js"; // Assuming this verifies token like NominationLink




export const createJudge = async (req, res) => {
  try {
    const { email, ...judgeData } = req.body;

    // 1. Find related applicant
    const applicant = await Applicant.findOne({ where: { email } });

    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found for the provided email." });
    }

    // 2. Create judge with associated email and applicant data
    const judge = await Judge.create({
      email,
      full_name: applicant.full_name,
      ...judgeData,
    });

    // 3. Verify and update status to accepted in applicant
    const token = applicant.token;
    const result = await ApplicantLink.verifyApplicantToken(token); // like verifyNominationToken()

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(201).json({
      message: "Judge created successfully",
      judge,
    });
  } catch (err) {
    console.error("Judge creation error:", err);
    return res.status(400).json({ error: err.message });
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

