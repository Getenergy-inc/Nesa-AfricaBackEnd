import mongoose from "mongoose";

const nonCompetitiveAwardCertificateSchema = new mongoose.Schema({
  recipientName: String,
  certificateUrl: String,
  validatedBy: String,
  dateIssued: { type: Date, default: Date.now }
});

export default mongoose.model("NonCompetitiveAwardCertificate", nonCompetitiveAwardCertificateSchema);
