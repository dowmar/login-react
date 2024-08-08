import { findUserByRefresh } from "../services/registerService.js";

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

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // TODO found user by refresh token
  const userByToken = await findUserByRefresh(refreshToken);
  if (!userByToken.length > 0) return res.sendStatus(401); //Unauthorized

  //decrypt
  const retrieveToken = await decryptToken(
    refreshToken,
    process.env.ENCRYPTION_SECRET
  );

  // evaluate password
  jwt.verify(
    retrieveToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || userByToken[0].email !== decoded.email)
        return res.sendStatus(403);
      // TODO create roles
      const roles = ["user", "admin"];
      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      res.json({ accessToken, roles });
    }
  );
};
