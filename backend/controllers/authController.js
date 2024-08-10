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

export const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  console.log(req.body);
  // if (login_type && login_type === "email_auth") {
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  // }
  const foundUser = await checkDuplicateUser(email);
  if (!foundUser.length)
    return res.status(401).json({ message: "User not registered" }); //Unauthorized
  // evaluate password
  console.log(foundUser[0]);
  const match = await bcrypt.compare(pwd, foundUser[0].pwd);

  const account = {
    name: foundUser[0].name,
    email: foundUser[0].email,
    login_type: foundUser[0].login_type,
    verify_status: foundUser[0].verify_status || "",
    img: foundUser[0].img || "",
  };

  if (match) {
    // create JWT
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
      maxAge: 1 * 60 * 60 * 1000,
    });
    // TODO create roles
    const roles = ["user", "admin"];

    // Add logging
    const addLogging = await insertUserLoggings(email, "login");
    if (addLogging) {
      console.log("log added", addLogging);
    }
    res.json({
      accessToken,
      roles,
      email: account.email,
      name: account.name,
      verify_status: account.verify_status,
      img: account.img,
      login_type: account.login_type,
    });
  } else {
    res.status(401).json({ message: "password not match" });
  }
};
