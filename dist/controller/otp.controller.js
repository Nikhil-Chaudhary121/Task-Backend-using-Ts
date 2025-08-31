"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpController = exports.sendOtpController = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// In-memory OTP store (replace with Redis/DB for production)
const otpStore = new Map();
// Nodemailer transporter
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS, // app password (no spaces!)
    },
});
// Function to send OTP email
const sendOtpEmail = async (to, otp) => {
    await exports.transporter.sendMail({
        from: "testingemail02@gmail.com",
        to: to,
        subject: "Your Otp Code",
        text: `Your OTP is ${otp}`,
    });
};
// Controller: Send OTP
const sendOtpController = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(301).json({ error: "Email is required" });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    try {
        await sendOtpEmail(email, otp);
        res.json({ success: true, message: "OTP sent to email" });
    }
    catch (err) {
        console.error("Error sending OTP:", err);
        res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
};
exports.sendOtpController = sendOtpController;
// Controller: Verify OTP
const verifyOtpController = (req, res) => {
    const { email, otp } = req.body;
    if (!email)
        return res.status(301).json({ error: "Email is required" });
    const validOtp = otpStore.get(email);
    if (validOtp && otp === validOtp) {
        otpStore.delete(email);
        return res.json({ success: true, message: "OTP verified" });
    }
    return res
        .status(301)
        .json({ success: false, error: "Invalid or expired OTP" });
};
exports.verifyOtpController = verifyOtpController;
