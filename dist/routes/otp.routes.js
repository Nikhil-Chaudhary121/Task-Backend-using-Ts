"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.ts
const express_1 = __importDefault(require("express"));
const otp_controller_1 = require("../controller/otp.controller");
const router = express_1.default.Router();
// Generate OTP & send email
router.post("/sendotp", otp_controller_1.sendOtpController);
router.post("/verifyotp", otp_controller_1.verifyOtpController);
exports.default = router;
