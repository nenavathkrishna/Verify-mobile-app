import User from "../models/User.js";
import { client } from "../config/twilio.js";
import jwt from "jsonwebtoken";
import { generateOTP, hashOTP } from "../utils/otp.js";
import crypto from "crypto";

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log("phoneNumber send for test", phoneNumber);

    if (!phoneNumber)
      return res.status(400).json({ error: "Phone number is required" });

    const otp = generateOTP();
    // expire in 2 minutes
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    let user = await User.findOne({ phoneNumber });
    if (!user) user = new User({ phoneNumber });

    user.otp = hashOTP(otp);
    user.otpExpiry = otpExpiry;
    await user.save();

    let formattedNumber = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
      formattedNumber = "+91" + phoneNumber;
    }
    // Send SMS using Twilio
    await client.messages.create({
      body: `Your VerifyApp code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (
      !crypto.timingSafeEqual(Buffer.from(user.otp), Buffer.from(hashOTP(otp)))
    ) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (new Date() > user.otpExpiry)
      return res.status(400).json({ error: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Verification successful", token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};
