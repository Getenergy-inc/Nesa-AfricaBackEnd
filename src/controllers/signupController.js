import jwt from 'jsonwebtoken';
import Referral from '../models/postgresql/Referral.js';

export const handleReferralSignup = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Missing referral token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { referral_code, referral_source } = decoded;

    const referral = await Referral.findOne({ where: { referral_code } });

    if (!referral || referral.referral_source !== referral_source.toLowerCase()) {
      return res.status(404).json({ message: "Referral not found or mismatched source" });
    }

    // Redirect to signup page with referral info
    return res.redirect(`${process.env.CLIENT_URL}`);
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired referral token" });
  }
};
