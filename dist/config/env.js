"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(` Missing environment variable: ${key}`);
    }
    return value;
}
exports.ENV = {
    NODE_ENV: getEnvVar("NODE_ENV"),
    PORT: getEnvVar("PORT"),
    MONGO_URI: getEnvVar("MONGO_URI"),
    GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),
    GOOGLE_CALLBACK_URL: getEnvVar("GOOGLE_CALLBACK_URL"),
    JWT_SECRET: getEnvVar("JWT_SECRET"),
};
