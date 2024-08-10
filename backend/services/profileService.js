import { updateProfileName, updateProfilePassword } from "../models/profile.js";

export const updateProfileNames = async (name, email) => {
  return await updateProfileName(name, email);
};
export const updateProfilePasswords = async (email, new_pwd) => {
  return await updateProfilePassword(email, new_pwd);
};
