import mongoose from "mongoose";
import envConfig from "./env.config";

const databaseConnection = async (): Promise<void> => {
  try {
    const mongoUri = `mongodb+srv://${envConfig.dbUser}:${envConfig.dbPassword}@${envConfig.dbHost}/${envConfig.dbName}`;
    await mongoose.connect(mongoUri);
  } catch (error: any) {
    console.error(`[database]: Connection error - ${error.message}`);
    throw new Error("Failed to connect to the database");
  }
};

export default databaseConnection;
