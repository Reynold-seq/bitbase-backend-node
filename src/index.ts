import app from "./app";
import { InitializeMongoConnection, ParsedEnvVariables } from "./configs";
import { GlobalErrorMessages, GlobalSuccessMessages } from "./constants";
import { customLogger } from "./utils";

const PORT = ParsedEnvVariables.PORT;
const ENV = ParsedEnvVariables.NODE_ENV;

(async () => {
  try {
    await InitializeMongoConnection();
    app.listen(PORT, () => {
      ENV === "development"
        ? customLogger.info(GlobalSuccessMessages.DEV_SERVER_STARTED)
        : customLogger.info(GlobalSuccessMessages.SERVER_STARTED);
    });
  } catch (error) {
    ENV === "development"
      ? customLogger.error(GlobalErrorMessages.DEV_SERVER_FAILED_TO_START, error)
      : customLogger.error(GlobalErrorMessages.SERVER_FAILED_TO_START, error);
    process.exit(1);
  }
})();

process.on("uncaughtException", (error: Error) => {
  customLogger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  customLogger.error("Unhandled Rejection at:", error);
  process.exit(1);
});
