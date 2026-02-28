import nodemailer from "nodemailer";
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(path.dirname(__filename));

// Load environment variables
dotenv.config({ path: path.join(dirname, ".env") });

let transporter = null;

// Only create transporter if email credentials are configured
if (
    process.env.EMAIL_SERVICE_HOST &&
    process.env.EMAIL_SERVICE_PORT &&
    process.env.EMAIL_SERVICE_USER &&
    process.env.EMAIL_SERVICE_PASSWORD
) {
    try {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE_HOST,
            port: parseInt(process.env.EMAIL_SERVICE_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_SERVICE_USER,
                pass: process.env.EMAIL_SERVICE_PASSWORD,
            },
        });
    } catch (error) {
        console.error("Error creating email transporter:", error);
        transporter = null; // Fallback to null if transporter creation fails
    }
}

export default transporter;
