import { Router } from "express";
import { GlobalErrorMessages } from "../constants";
import * as auth from "../controllers/auth.controller";
import { RateLimiterMiddleware } from "../middlewares";
const authRoutes = Router();

authRoutes.post("/signup", RateLimiterMiddleware(GlobalErrorMessages.RATE_LIMIT_ERROR, 2), auth.signUpUserController);
authRoutes.post("/signin", auth.signInUserController);
authRoutes.post("/signout", auth.signOutUserController);

export default authRoutes;
