import {
  registerUser,
  checkDuplicateUser,
} from "../services/registerService.js";

import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, pwd, email, login_type } = req.body;
  // if (login_type && login_type === "email_auth") {
  if (!name || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // }
  const duplicate = await checkDuplicateUser(email);
  console.log("dup len", duplicate.length);
  if (duplicate.length >= 1)
    return res.status(409).json({ error: "duplicate" });
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const results = await registerUser(name, hashedPwd, email, login_type);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
