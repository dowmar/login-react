import {
  registerUser,
  checkDuplicateUser,
  insertToken,
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

export const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  // if (login_type && login_type === "email_auth") {
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  // }
  const foundUser = await checkDuplicateUser(email);
  if (!foundUser.length) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser[0].pwd);
  if (match) {
    // create JWT
    const accessToken = jwt.sign(
      { email: foundUser[0].email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser[0].email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    // attach refreshToken to database
    const encryptedToken = await encryptToken(
      refreshToken,
      process.env.ENCRYPTION_SECRET
    );

    // TODO change date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getMinutes() + 5);
    const storeToken = await insertToken(email, encryptedToken, expiryDate);
    console.log("storeToken", storeToken);

    res.cookie("jwt", encryptedToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 5 * 60 * 1000,
    });
    // TODO create roles
    const roles = ["user", "admin"];
    res.json({ accessToken, roles });
  } else {
    res.sendStatus(401);
  }
};
