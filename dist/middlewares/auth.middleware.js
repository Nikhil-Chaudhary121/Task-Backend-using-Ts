"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token)
        return res.status(401).json({ message: "Invalid token format" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};
exports.default = authMiddleware;
