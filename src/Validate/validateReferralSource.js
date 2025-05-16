import jwt from 'jsonwebtoken';
import Referral from '../models/postgresql/Referral.js';

export const verifyReferralSourceAndRedirect = async (req, res) => {
  const { token } = req.query;
  const referrer = req.get('referer') || '';

  if (!token) {
    return res.status(400).json({ message: "Missing referral token" });
  }

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { referral_code, referral_source } = decoded;

    // Verify the source matches the referrer
    if (!referrer.toLowerCase().includes(referral_source.toLowerCase())) {
      return res.status(403).json({ message: "Referral source mismatch with origin" });
    }

    // Check if the referral exists in the database
    const referral = await Referral.findOne({ where: { referral_code } });

    if (!referral || referral.referral_source !== referral_source.toLowerCase()) {
      return res.status(404).json({ message: "Referral not found or mismatched source" });
    }

    // Redirect to signup page with referral details
    return res.redirect(`${process.env.CLIENT_URL}/signup?ref=${referral_code}&source=${referral_source}`);

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Handle expired token, but still redirect
      const decoded = jwt.decode(token); // No verification needed
      if (decoded?.referral_code && decoded?.referral_source) {
        return res.redirect(`${process.env.CLIENT_URL}/signup?ref=${decoded.referral_code}&source=${decoded.referral_source}`);
      }
    }
    return res.status(401).json({ message: "Invalid or expired referral token" });
  }
};
