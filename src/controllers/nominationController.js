import NominationService from "../services/nominationService.js";
import { sendNominationEmail } from "../utils/NominesEmailUtility.js"; // adjust path as needed
import { uploadImageToCloudinary } from "../utils/cloudinary.js"; // create this helper
import fs from "fs/promises";
import Joi from "joi";

// Joi schema for validation
const nominationSchema = Joi.object({
  category_id: Joi.string().optional(),  // or .required() if needed
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  category: Joi.string().optional(),
  competitive_type: Joi.string().optional(),
  sub_category: Joi.string().optional(),
  linkedinProfile: Joi.string().optional(),
  achievements: Joi.string().optional(),
  status: Joi.string().optional(),
  // add other fields as needed
}).unknown(true);

class NominationController {
  // Create a nomination
  static async create(req, res) {
    try {
      const { error, value } = nominationSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const documentUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const url = await uploadImageToCloudinary(file.path, "nominees");
          documentUrls.push(url);
          await fs.unlink(file.path); // cleanup
        }
      }

      const nominationPayload = {
        ...value,
        documents: documentUrls, // Save as array
      };

      const nomination = await NominationService.createNomination(nominationPayload);

      if (nominationPayload.email) {
        await sendNominationEmail(nominationPayload.email, nominationPayload.name, nomination.id);
      }

      return res.status(201).json({ message: "Nomination created", nomination });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }


  // Get all nominations
  static async getAll(req, res) {
    try {
      const nominations = await NominationService.getAllNominations();
      return res.status(200).json(nominations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get nomination by ID
  static async getById(req, res) {
    try {
      const nomination = await NominationService.getNominationById(req.params.id);
      if (!nomination) return res.status(404).json({ message: "Nomination not found" });

      return res.status(200).json(nomination);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update nomination (with optional image upload)
  static async update(req, res) {
    try {
      // Allow partial update - make all schema fields optional
      const updateSchema = nominationSchema.fork(
        Object.keys(nominationSchema.describe().keys),
        (schema) => schema.optional()
      );

      const { error, value } = updateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      let updatedPayload = { ...value };

      // Handle multiple document uploads
      if (req.files && req.files.length > 0) {
        const uploadedDocs = [];

        for (const file of req.files) {
          const url = await uploadImageToCloudinary(file.path);
          uploadedDocs.push(url);
          await fs.unlink(file.path); // clean up temp file
        }

        updatedPayload.documents = uploadedDocs; // Save array of URLs
      }

      const updatedNomination = await NominationService.updateNomination(req.params.id, updatedPayload);

      if (!updatedNomination) {
        return res.status(404).json({ message: "Nomination not found" });
      }

      return res.status(200).json({
        message: "Nomination updated successfully",
        updatedNomination,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete nomination
  static async delete(req, res) {
    try {
      const deleted = await NominationService.deleteNomination(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Nomination not found" });

      return res.status(200).json({ message: "Nomination deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default NominationController;
