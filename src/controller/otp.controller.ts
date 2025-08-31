import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();
// In-memory OTP store (replace with Redis/DB for production)
const otpStore = new Map<string, string>();


// Nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS, // app password (no spaces!)
  },
});

// Function to send OTP email
const sendOtpEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: "testingemail02@gmail.com",
      to: to,
      subject: "Your Otp Code",
      text: `Your OTP is ${otp}`,
    
  });
};

// Controller: Send OTP
export const sendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(301).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) { 
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};

// Controller: Verify OTP
export const verifyOtpController = (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email) return res.status(301).json({ error: "Email is required" });
  const validOtp = otpStore.get(email);

  if (validOtp && otp === validOtp) {
    otpStore.delete(email);
    return res.json({ success: true, message: "OTP verified" });
  }

  return res
    .status(301)
    .json({ success: false, error: "Invalid or expired OTP" });
};
