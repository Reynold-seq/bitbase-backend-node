import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import { ParsedEnvVariables } from "./configs";
import { authRoutes } from "./routes";

const app: Application = express();

/**
 * middlewares
 */
app.use(helmet());
app.use(
  cors({
    origin: ParsedEnvVariables.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by");

/**
 * routes
 */
app.use("/api/v1/auth", authRoutes);

export default app;
