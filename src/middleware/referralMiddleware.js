// referralMiddleware.js
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Referral from '../models/postgresql/Referral.js';

const referralPoints = {
  facebook: 5,
  linkedin: 4,
  instagram: 6,
  twitter: 7,
  telegram: 4,
  tiktok: 6,
};

const generateReferralLink = async ({ referred_by, referral_source, action }) => {
  if (!referred_by || !referral_source || !action) {
    throw new Error("Missing required fields");
  }

  const source = referral_source.toLowerCase();

  if (!referralPoints[source]) {
    throw new Error("Unsupported referral source");
  }

  const referral_code = uuidv4();

  const newReferral = await Referral.create({
    referred_by,
    referral_code,
    referral_source: source,
    action,
    points: referralPoints[source],
  });

  const payload = {
    referral_code,
    referral_source: source,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  const referralLink = `${process.env.SERVER_URL}/verify-referral?token=${token}`;

  return {
    message: "Referral link created",
    referral_link: referralLink,
    referral: newReferral,
  };
};

export default generateReferralLink;
