import {
  insertUser,
  checkDuplicate,
  insertRefreshToken,
  findUserByToken,
  deleteRefreshTokenByToken,
  findEmailToken,
  updateEmailToken,
} from "../models/register.js";

export const registerUser = async (
  user,
  pwd,
  email,
  login_type,
  emailToken,
  img
) => {
  return await insertUser(user, pwd, email, login_type, emailToken, img);
};

export const checkDuplicateUser = async (email) => {
  const hasil = await checkDuplicate(email);
  // console.log("services", hasil);
  return hasil;
};

export const insertToken = async (email, token, expiry_date) => {
  return await insertRefreshToken(email, token, expiry_date);
};

export const findUserByRefresh = async (token) => {
  return await findUserByToken(token);
};

export const deleteRefreshToken = async (token) => {
  return await deleteRefreshTokenByToken(token);
};

export const checkEmailToken = async (emailToken) => {
  return await findEmailToken(emailToken);
};
export const updateEmailTokens = async (email) => {
  return await updateEmailToken(email);
};
