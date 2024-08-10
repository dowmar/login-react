import { findUserByRefresh } from "../services/registerService.js";
import { checkDuplicateUser } from "../services/registerService.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto, { verify } from "crypto";

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

  const foundUser = await checkDuplicateUser(userByToken[0].email);

  //decrypt
  const retrieveToken = await decryptToken(
    refreshToken,
    process.env.ENCRYPTION_SECRET
  );

  const account = {
    name: foundUser[0].name,
    email: foundUser[0].email,
    login_type: foundUser[0].login_type,
    verify_status: foundUser[0].verify_status || "",
    img: foundUser[0].img || "",
    emailToken: foundUser[0].email_token || "",
  };

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
      res.json({
        accessToken,
        roles,
        email: account.email,
        name: account.name,
        verify_status: account.verify_status,
        img: account.img,
        login_type: account.login_type,
        emailToken: account.emailToken,
      });
    }
  );
};
