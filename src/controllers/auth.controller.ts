import { type Request, type Response } from "express";
import { ParsedEnvVariables } from "../configs";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { signInUserService, signUpUserService } from "../services/auth.services";
import { customAsyncWrapper, sendApiResponse } from "../utils";
import { signInSchema, signUpSchema } from "../validations";

/**
 * signUpUserController function to handle user signup request.
 * This function validates the request body, invokes the signUpuserService
 * to create a new user and send a success response.
 *
 * @param req - The request object containing the user data for signup.
 * @param res - The response object used to send the API response.
 * @returns A success response with a message when user signup is successful.
 */
export const signUpUserController = customAsyncWrapper(async (req: Request, res: Response) => {
  const body = signUpSchema.parse(req.body);

  await signUpUserService(body);

  sendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.SIGN_UP_SUCCESS,
  });
});

/**
 * signInUserController function to handle user signin request.
 * This function validates request and body, invokes the signInUserService
 * if user exist's it return user data and set http cookie.
 *
 * @param req - The request object containing the user data to signin.
 * @param res - The response object used to send the API response.
 * @returns A success message and user data when user is successfully signed in.
 */
export const signInUserController = customAsyncWrapper(async (req: Request, res: Response) => {
  const body = signInSchema.parse(req.body);

  const { user, token } = await signInUserService(body);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: ParsedEnvVariables.NODE_ENV === "production",
    sameSite: ParsedEnvVariables.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_IN_SUCCESS,
    data: user,
  });
});

/**
 * signOutUserController function to handle user signout request.
 * This functions clears the cookie and send's a success response.
 *
 * @returns A success message response indicating user has been loggedout.
 */
export const signOutUserController = customAsyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("accessToken");

  sendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_OUT_SUCCESS,
  });
});

/**
 * verifyUserController function to handle user verification request.
 * This function retrieves authenticated user from the request context
 * and return the user data as response.
 *
 * @param req - The request object which contains the authenticated user data in its context.
 * @param res - The response object which is used to send API response.
 * @returns A Success response containing the authenticated user data
 */
export const verifyUserController = customAsyncWrapper(async (req: Request, res: Response) => {
  const user = req.ctx;

  sendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: user,
  });
});
