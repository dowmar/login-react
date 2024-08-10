import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASS,
    },
  });
  return transporter;
};

export default createMailTransporter;
