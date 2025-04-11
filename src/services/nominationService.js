import Nomination from "../models/postgresql/Nomination.js";

class NominationService {
  
  // Create a new nomination
  static async createNomination(data) {
    return await Nomination.create(data);
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
