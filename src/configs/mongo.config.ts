import mongoose, { MongooseError } from "mongoose";
import { ParsedEnvVariables } from ".";
import { GlobalErrorMessages, GlobalSuccessMessages } from "../constants";
import { customLogger } from "../utils";

/**
 * Initializes a connection to MongoDB using mongoose.
 *
 * This function attempts to connect to the mongoDB database using the URI
 * defined in the environment variables. It handles following.
 *
 * - Logs a success message upon successful connection.
 * - Logs a warning and exists the process if the mongoDB URI is not defined.
 * - Logs detailed error message on connection failure and exits the process.
 *
 * Logs are handled by custon winston logger.
 *
 * @example
 * ```ts
 * import {InitializeMongoConnection} from "./configs"
 * ```
 *
 */
export async function InitializeMongoConnection() {
  const mongo_url = ParsedEnvVariables.MONGO_DB_URI;

  if (!mongo_url) {
    customLogger.warn(GlobalErrorMessages.MONGO_ENV_NOT_DEFINED);
    process.exit(1);
  }
  try {
    await mongoose.connect(mongo_url);
    customLogger.info(GlobalSuccessMessages.MONGO_CONNECTION_SUCCESS);
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      customLogger.error(`Mongoose Error: ${error.message}`);
    } else if (error instanceof Error) {
      customLogger.error(`Error: ${error.message}`);
    } else {
      customLogger.error(GlobalErrorMessages.MONGO_CONNECTION_ERROR, error);
    }
    process.exit(1);
  }
}
