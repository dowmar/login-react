import express from "express";
import cors from "cors";
import registerRoutes from "./routes/registerRoutes.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refresh.js";
import profileRoutes from "./routes/profileRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import logoutRoutes from "./routes/logout.js";
import corsOptions from "./config/corsOption.js";

import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
//cookie middleware
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(verifyJWT);
app.use("/api/profile", profileRoutes);

export default app;
