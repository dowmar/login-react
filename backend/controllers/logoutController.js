import {
  findUserByRefresh,
  deleteRefreshToken,
  insertUserLoggings,
} from "../services/registerService.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const decryptToken = async (encryptedToken, secret) => {
  const decipher = crypto.createDecipher("aes-256-cbc", secret);
  let decrypted = decipher.update(encryptedToken, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const handleLogout = async (req, res) => {
  // on FE need to delete accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // no content

  //   console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // TODO found user by refresh token
  const userByToken = await findUserByRefresh(refreshToken);
  if (userByToken.length === 0) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //no content
  }

  // delete refresh token
  const removeToken = await deleteRefreshToken(refreshToken);

  const addLogging = await insertUserLoggings(userByToken[0].email, "logout");
  if (addLogging) {
    console.log("log added", addLogging);
  }

  if (removeToken > 0)
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure: true - for production
  //   res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};
