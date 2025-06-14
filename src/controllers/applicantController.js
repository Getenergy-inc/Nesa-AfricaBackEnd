// import * as applicantService from "../services/applicantService.js";

// export const create = async (req, res) => {
//   try {
//     const applicant = await applicantService.createApplicant(req.body);
//     res.status(201).json({ status: "success", applicant });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };

// export const findAll = async (req, res) => {
//   const applicants = await applicantService.getAllApplicants();
//   res.json({ status: "success", applicants });
// };

// export const findOne = async (req, res) => {
//   const applicant = await applicantService.getApplicantById(req.params.id);
//   if (!applicant) {
//     return res.status(404).json({ status: "error", message: "Not found" });
//   }
//   res.json({ status: "success", applicant });
// };

// export const update = async (req, res) => {
//   try {
//     const updated = await applicantService.updateApplicant(req.params.id, req.body);
//     res.json({ status: "success", updated });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };

// export const remove = async (req, res) => {
//   try {
//     await applicantService.deleteApplicant(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };



import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { uploadImageToCloudinary } from '../utils/cloudinary.js';
import { sendJudgeEmail } from '../utils/JudgeEmailUtility.js'; // Customize this
import ApplicantService from '../services/applicantService.js'; // Make sure this has createApplicant()
import Joi from 'joi';




export const applicantSchema = Joi.object({
  full_name: Joi.string().min(1).required(),
  experience: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().optional(),
  state_and_region: Joi.string().optional(),
  motivation_statement: Joi.string().optional(),
  education_background: Joi.string().optional(),
  upload_document: Joi.string().optional(), // optional extra fields
  upload_profile_image: Joi.string().optional(),
  token: Joi.string().optional(),
}).unknown(true); // allow additional fields if any



class ApplicantController {
  static async create(req, res) {
    try {
      const { error, value } = applicantSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      let documentUrl = null;
      let profileImageUrl = null;

      // Upload document
      if (req.files?.upload_document?.[0]) {
        documentUrl = await uploadImageToCloudinary(req.files.upload_document[0].path, 'applicants');
        await fs.unlink(req.files.upload_document[0].path);
      }

      // Upload profile image
      if (req.files?.upload_profile_image?.[0]) {
        profileImageUrl = await uploadImageToCloudinary(req.files.upload_profile_image[0].path, 'applicants');
        await fs.unlink(req.files.upload_profile_image[0].path);
      }

      const token = jwt.sign(
        { email: value.email, applicantId: uuidv4() },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const applicantPayload = {
        full_name: value.full_name,
        experience: value.experience,
        email: value.email,
        phone_number: value.phone_number,
        state_and_region: value.state_and_region,
        motivation_statement: value.motivation_statement,
        education_background: value.education_background,
        upload_document: documentUrl,
        upload_profile_image: profileImageUrl,
        token,
      };

      const applicant = await ApplicantService.createApplicant(applicantPayload);

      // Send confirmation email with token if needed
      if (value.email) {
        const confirmationLink = `https://nesa-test-4alu.vercel.app/nomineesignup1?token=${token}`;
        await sendJudgeEmail(value.email, value.full_name, confirmationLink);
      }

      return res.status(201).json({ message: 'Applicant created successfully', applicant });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default ApplicantController;
