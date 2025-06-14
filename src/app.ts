import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";

const app: Application = express();

/**
 * middlewares
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

/**
 * routes
 */

export default app;
