import {
  registerUser,
  checkDuplicateUser,
  updateEmailTokens,
  checkEmailToken,
} from "../services/registerService.js";

import bcrypt from "bcrypt";
import sendVerificationMail from "../utils/sendVerificationMail.js";
import crypto from "crypto";

const registerNotEmail = async (account) => {
  try {
  } catch (error) {
    return error;
  }
};

export const register = async (req, res) => {
  // let results;
  const { user, pwd, email, login_type, img } = req.body;
  if (login_type && login_type === "email_auth") {
    if (!email || !pwd) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
  }
  const account = {
    name: user,
    email: email,
    login_type,
    emailToken: crypto.randomBytes(64).toString("hex"),
  };
  const duplicate = await checkDuplicateUser(email);
  console.log("dup len", duplicate.length);
  if (duplicate.length >= 1)
    return res.status(409).json({ error: "duplicate" });
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const results = await registerUser(
      user,
      login_type === "email_auth" ? hashedPwd : "",
      email,
      login_type,
      login_type === "email_auth" ? account.emailToken : "",
      login_type === "email_auth" ? "" : img
    );

    if (login_type === "email_auth") {
      sendVerificationMail(account);
    }

    res.status(200).json(results);
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
