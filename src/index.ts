import app from "./app";
import { InitializeMongoConnection } from "./configs";

(async () => {
  try {
    await InitializeMongoConnection();
    app.listen(3000, () => {
      console.log(`Server up and running on port 3000`);
    });
  } catch (error) {
    process.exit(1);
  }
})();
