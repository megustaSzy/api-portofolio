import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import expres from "express";

import { requestLogger } from "./middlewares/logger";


const app = expres();
app.use(requestLogger)

app.use(expres.json());

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

export default app;
