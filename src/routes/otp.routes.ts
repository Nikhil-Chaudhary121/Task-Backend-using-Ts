// routes/auth.ts
import express from "express";
import {  sendOtpController, verifyOtpController } from "../controller/otp.controller";

  const router = express.Router();

// Generate OTP & send email
router.post("/sendotp", sendOtpController);

router.post("/verifyotp",verifyOtpController );
  


export default router