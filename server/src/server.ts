import app from "./app";
import databaseConnection from "./config/db.config";
import swaggerDocs from "./utils/swagger";
import envConfig from "./config/env.config";

const startServer = async () => {
  try {
    await databaseConnection();
    console.log("[server]: Server is up and running.");
    console.log("[database]: Successfully connected to MongoDB.");

    app.listen(envConfig.port, () => {
      swaggerDocs(app, envConfig.port);
    });
  } catch (error: any) {
    console.error(`[server]: Error occurred - ${error.message}`);
    process.exit(1);
  }
};

startServer();
