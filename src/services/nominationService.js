import Nomination from "../models/postgresql/Nomination.js";

class NominationService {


  // Create a new nomination
  static async createNomination(data) {
    try {
      // Validate required fields
      if (!data.name || !data.email) {
        throw new Error("Name and email are required.");
      }

      // Check if email is valid (Sequelize will also validate but this gives early feedback)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format.");
      }


      // Create nomination
      const nomination = await Nomination.create(data);
      return nomination;

    } catch (error) {
      // Sequelize unique constraint errors
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("Email must be unique.");
      }
      throw new Error(error.message || "Error creating nomination.");
    }
  }


  // Get all nominations
  static async getAllNominations() {
    return await Nomination.findAll();
  }

  // Get a nomination by ID
  static async getNominationById(nominationId) {
    return await Nomination.findByPk(nominationId);
  }

  // Update a nomination
  static async updateNomination(nominationId, data) {
    const nomination = await Nomination.findByPk(nominationId);
    if (!nomination) return null;

    return await nomination.update(data);
  }

  // Delete a nomination
  static async deleteNomination(nominationId) {
    const nomination = await Nomination.findByPk(nominationId);
    if (!nomination) return null;

    await nomination.destroy();
    return true;
  }
}

export default NominationService;
