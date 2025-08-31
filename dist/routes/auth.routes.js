"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const passport_1 = __importDefault(require("../config/passport"));
const router = (0, express_1.Router)();
router.get("/getuser/:id", auth_controller_1.getUser);
// POST /api/auth/signup
router.post("/signup", auth_controller_1.signup);
// POST /api/auth/login
router.post("/login", auth_controller_1.login);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), (req, res) => {
    const { token, user } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&userId=${user._id}`);
});
exports.default = router;
