import Nomination from "../models/postgresql/Nomination.js";
import { sendNominationEmail } from "../utils/NominesEmailUtility.js";

class NominationEmailService {
  // Create a new nomination
  static async createNomination(data) {
    const nomination = await Nomination.create(data);

    // Send email after creating nomination
    if (data.nominee_email && data.nominee_name) {
      await sendNominationEmail(data.nominee_email, data.nominee_name, nomination.id);
    }

    return nomination;
  }

  // ... rest remains unchanged
}

export default NominationEmailService;
