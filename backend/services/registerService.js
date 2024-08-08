import {
  insertUser,
  checkDuplicate,
  insertRefreshToken,
  findUserByToken,
  deleteRefreshTokenByToken,
} from "../models/register.js";

export const registerUser = async (user, pwd, email, login_type) => {
  return await insertUser(user, pwd, email, login_type);
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
