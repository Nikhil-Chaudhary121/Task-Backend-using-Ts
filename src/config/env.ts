import dotenv from "dotenv";

dotenv.config();

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(` Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  NODE_ENV: getEnvVar("NODE_ENV"),
  PORT: getEnvVar("PORT"),
  MONGO_URI: getEnvVar("MONGO_URI"),

  GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnvVar("GOOGLE_CALLBACK_URL"),

  JWT_SECRET: getEnvVar("JWT_SECRET"),
};