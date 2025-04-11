import NominationService from "../services/nominationService.js";
import { sendNominationEmail } from "../utils/NominesEmailUtility.js"; // adjust path as needed


class NominationController {
  
  // Create a nomination
  static async create(req, res) {
    try {
      const nomination = await NominationService.createNomination(req.body);
  
      // Extract nominee details (update keys based on your actual req.body structure)
      const nomineeEmail = req.body.email; // assuming nominee email is provided
      const nomineeName = req.body.name || "Nominee"; // fallback to 'Nominee' if name is not provided
  
      // Send the nomination email
      if (nomineeEmail) {
        await sendNominationEmail(nomineeEmail, nomineeName, nomination.id);
        console.log("email send to Nomines...!")
      }
  
      return res.status(201).json({ message: "Nomination created", nomination });
    } catch (error) {
      console.error("Error creating nomination:", error);
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

  // Update nomination
  static async update(req, res) {
    try {
      const updatedNomination = await NominationService.updateNomination(req.params.id, req.body);
      if (!updatedNomination) return res.status(404).json({ message: "Nomination not found" });

      return res.status(200).json({ message: "Nomination updated", updatedNomination });
    } catch (error) {
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
