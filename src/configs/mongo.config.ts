import mongoose, { MongooseError } from "mongoose";
import { customLogger } from "../utils";

/**
 * Initializes a connection to MongoDB using mongoose.
 */
export async function InitializeMongoConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bitbase");
    customLogger.info("Mongoose connection successful");
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      customLogger.error(`Mongoose Error: ${error.message}`);
    } else if (error instanceof Error) {
      customLogger.error(`Mongo Error: ${error.message}`);
    }
    customLogger.error(`An Error occured while connecting mongoose`);
    process.exit(1);
  }
}
