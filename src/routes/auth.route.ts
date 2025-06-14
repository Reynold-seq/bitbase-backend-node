import { Router } from "express";
import * as auth from "../controllers/auth.controller";
const authRoutes = Router();

authRoutes.post("/signup", auth.signUpUserController);
authRoutes.post("/signin", auth.signInUserController);
authRoutes.post("/signout", auth.signOutUserController);

export default authRoutes;
