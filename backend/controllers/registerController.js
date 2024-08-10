import {
  registerUser,
  checkDuplicateUser,
  updateEmailTokens,
  checkEmailToken,
  insertToken,
  insertUserLoggings,
} from "../services/registerService.js";

import bcrypt from "bcrypt";
import sendVerificationMail from "../utils/sendVerificationMail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const encryptToken = async (token, secret) => {
  const cipher = crypto.createCipher("aes-256-cbc", secret);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const registerNotEmail = async (account) => {
  try {
  } catch (error) {
    return error;
  }
};

export const registerEmail = async (req, res) => {
  const { user, pwd, email, login_type } = req.body;

  if (!email || !pwd) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const account = {
    name: user,
    email: email,
    login_type,
    emailToken: crypto.randomBytes(64).toString("hex"),
    verify_status: "not-verified",
  };

  const duplicate = await checkDuplicateUser(email);
  if (duplicate.length >= 1) {
    return res.status(409).json({ error: "duplicate" });
  }

  try {
    // Encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const results = await registerUser(
      user,
      hashedPwd,
      email,
      login_type,
      account.emailToken,
      "",
      "not-verified"
    );

    // Send verification email
    sendVerificationMail(account);

    // Create JWT
    const accessToken = jwt.sign(
      { email: account.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { email: account.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Attach refreshToken to database
    const encryptedToken = await encryptToken(
      refreshToken,
      process.env.ENCRYPTION_SECRET
    );

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5);
    await insertToken(email, encryptedToken, expiryDate);

    res.cookie("jwt", encryptedToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const roles = ["user", "admin"];

    // Add logging
    await insertUserLoggings(email, "login");

    res.status(200).json({
      accessToken,
      roles,
      email: account.email,
      name: account.name,
      verify_status: account.verify_status,
      img: "",
      login_type: account.login_type,
      emailToken: account.emailToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerSocial = async (req, res) => {
  const { user, email, login_type, img } = req.body;

  if (!email || !login_type) {
    return res
      .status(400)
      .json({ message: "Email and login type are required." });
  }

  const account = {
    name: user,
    email: email,
    login_type,
    verify_status: "verified",
  };

  const duplicate = await checkDuplicateUser(email);
  if (duplicate.length >= 1) {
    return res.status(409).json({ error: "duplicate" });
  }

  try {
    const results = await registerUser(
      user,
      "", // No password required for social login
      email,
      login_type,
      "", // No email token for social login
      img || "",
      "verified"
    );

    // Create JWT
    const accessToken = jwt.sign(
      { email: account.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { email: account.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Attach refreshToken to database
    const encryptedToken = await encryptToken(
      refreshToken,
      process.env.ENCRYPTION_SECRET
    );

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5);
    await insertToken(email, encryptedToken, expiryDate);

    res.cookie("jwt", encryptedToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const roles = ["user", "admin"];

    // Add logging
    await insertUserLoggings(email, "login");

    res.status(200).json({
      accessToken,
      roles,
      email: account.email,
      name: account.name,
      verify_status: account.verify_status,
      img: account.img,
      login_type: account.login_type,
      emailToken: "", // No email token for social login
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { emailToken } = req.body;
  if (!emailToken)
    return res.status(404).json({ message: "Email Token not found" });
  const findUser = await checkEmailToken(emailToken);
  if (!findUser.length)
    return res.status(401).json({ message: "User not found" });
  console.log("check user from token", findUser);
  try {
    const updateEmailToken = await updateEmailTokens(findUser[0].email);
    res
      .status(200)
      .json({ message: `updated email token ${updateEmailToken}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resendEmail = async (req, res) => {
  const { email, emailToken, name, login_type } = req.body;
  if (!emailToken)
    return res.status(404).json({ message: "Email Token not found" });

  const account = {
    name,
    email,
    login_type,
    emailToken,
  };

  await sendVerificationMail(account);

  try {
    res.status(200).json({ message: `Email sent to ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
