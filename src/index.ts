import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { requestLogger } from "./middlewares/logger";

import UserRoute from "./routes/user.route";
import AuthRoute from "./routes/auth.route";

const app = express();
app.use(requestLogger);
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoute);

export default app;
