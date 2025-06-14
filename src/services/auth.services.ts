import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { User } from "../models";
import { customError } from "../utils";
import { signInSchemaType, type signUpSchemaType } from "../validations";

export const signUpUserService = async (body: signUpSchemaType) => {
  const { firstname, lastname, email, password, mobile } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new customError(ApiErrorMessages.USER_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }
  const salt = parseInt(ParsedEnvVariables.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    mobile: parseInt(mobile),
  });
};

export const signInUserService = async (body: signInSchemaType) => {
  const { email, password } = body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    throw new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const userData = {
    _id: existingUser._id,
    firstname: existingUser.firstname,
    lastname: existingUser.lastname,
    email: existingUser.email,
    mobile: existingUser.mobile,
  };

  const token = await jwt.sign({ _id: existingUser._id }, ParsedEnvVariables.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { user: userData, token };
};
