import {
  updateProfileNames,
  updateProfilePasswords,
} from "../services/profileService.js";

import { checkDuplicateUser } from "../services/registerService.js";

import bcrypt from "bcrypt";

export const updateUserName = async (req, res) => {
  const { name, email } = req.body;
  console.log(req);
  if (!email) return res.status(404).json({ message: "Email Not found" });

  try {
    const updateName = await updateProfileNames(name, email);
    res.status(200).json({ message: `updated user name ${updateName}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePassword = async (req, res) => {
  const { email, old_pwd, new_pwd } = req.body;
  if (!email) return res.status(404).json({ message: "Email Token not found" });

  const foundUser = await checkDuplicateUser(email);
  if (!foundUser.length)
    return res.status(401).json({ message: "User not found" }); //Unauthorized
  // evaluate password
  console.log(foundUser[0]);
  const match = await bcrypt.compare(old_pwd, foundUser[0].pwd);
  if (!match)
    return res.status(401).json({ message: "Wrong Password, Try Again" }); //Unauthorized

  try {
    const hashedPwd = await bcrypt.hash(new_pwd, 10);
    const updatePassword = await updateProfilePasswords(email, hashedPwd);
    res.status(200).json({ message: `updated Password ${updatePassword}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
