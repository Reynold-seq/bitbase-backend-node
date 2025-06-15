import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { GlobalErrorMessages, HttpStatusCode } from "../constants";
import { User } from "../models";
import { IContext } from "../types";
import { customError } from "../utils";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: GlobalErrorMessages.UNAUTHORIZED,
      });
    }
    const decodedToken = jwt.verify(accessToken, ParsedEnvVariables.ACCESS_TOKEN_SECRET) as IContext;

    const existingUser = await User.findById(decodedToken._id);

    if (!existingUser) {
      throw new customError(GlobalErrorMessages.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED);
    }

    const userObject = {
      _id: existingUser._id,
      email: existingUser.email,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      role: existingUser.role,
      mobile: existingUser.mobile,
    };

    req.ctx = userObject;
    next();
  } catch (error) {
    next(error);
  }
};
