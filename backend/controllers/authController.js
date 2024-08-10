import {
  checkDuplicateUser,
  insertToken,
  insertUserLoggings,
} from "../services/registerService.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
// import fsPromises from fsPromises;

dotenv.config();

const encryptToken = async (token, secret) => {
  const cipher = crypto.createCipher("aes-256-cbc", secret);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const handleEmailLogin = async (req, res) => {
  const { email, pwd } = req.body;
  console.log("HANDLE EMAIL LOGIN", req.body);

  if (!email || !pwd) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundUser = await checkDuplicateUser(email);
  if (!foundUser.length) {
    return res.status(401).json({ message: "User not registered" }); // Unauthorized
  }

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser[0].pwd);
  if (!match) {
    return res.status(401).json({ message: "Password does not match" });
  }

  const account = {
    name: foundUser[0].name,
    email: foundUser[0].email,
    login_type: foundUser[0].login_type,
    verify_status: foundUser[0].verify_status || "",
    img: foundUser[0].img || "",
    emailToken: foundUser[0].email_token || "",
  };

  if (match) {
    // Create JWT
    const accessToken = jwt.sign(
      { email: foundUser[0].email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser[0].email },
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

    // Create roles
    const roles = ["user", "admin"];

    // Add logging
    await insertUserLoggings(email, "login");

    res.json({
      accessToken,
      roles,
      email: account.email,
      name: account.name,
      verify_status: account.verify_status,
      img: account.img,
      login_type: account.login_type,
      emailToken: account.emailToken,
    });
  }
};

export const handleSocialLogin = async (req, res) => {
  const { email, login_type } = req.body;
  console.log("HANDLE SOCIAL LOGIN", req.body);

  if (!email || !login_type) {
    return res
      .status(400)
      .json({ message: "Email and login type are required." });
  }

  const foundUser = await checkDuplicateUser(email);
  if (!foundUser.length) {
    return res.status(401).json({ message: "User not registered" }); // Unauthorized
  }

  const account = {
    name: foundUser[0].name,
    email: foundUser[0].email,
    login_type: foundUser[0].login_type,
    verify_status: foundUser[0].verify_status || "",
    img: foundUser[0].img || "",
    emailToken: foundUser[0].email_token || "",
  };

  // Create JWT
  const accessToken = jwt.sign(
    { email: foundUser[0].email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "300s" }
  );
  const refreshToken = jwt.sign(
    { email: foundUser[0].email },
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

  // Create roles
  const roles = ["user", "admin"];

  // Add logging
  await insertUserLoggings(email, "login");

  res.json({
    accessToken,
    roles,
    email: account.email,
    name: account.name,
    verify_status: account.verify_status,
    img: account.img,
    login_type: account.login_type,
    emailToken: account.emailToken,
  });
};
