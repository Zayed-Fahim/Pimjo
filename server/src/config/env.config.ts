import dotenv from "dotenv";
dotenv.config();

type EnvConfigProps = {
  port: number;
  nodeEnv: string;
  dbName: string;
  dbPassword: string;
  dbUser: string;
  dbHost: string;
  jwtSecret: string;
  jwtPublicKeyPath: string;
  jwtPrivateKeyPath: string;
  jwtExpiration: string;
};

const {
  PORT: port,
  NODE_ENV: nodeEnv,
  DB_NAME: dbName,
  DB_PASSWORD: dbPassword,
  DB_USER: dbUser,
  DB_HOST: dbHost,
  JWT_SECRET: jwtSecret,
  JWT_PUBLIC_KEY_PATH: jwtPublicKeyPath,
  JWT_PRIVATE_KEY_PATH: jwtPrivateKeyPath,
  JWT_EXPIRES_IN: jwtExpiration,
} = process.env;

const envConfig = (): EnvConfigProps => {
  if (!port || !nodeEnv) throw new Error("Missing important env variables!");
  if (!dbName || !dbPassword || !dbUser || !dbHost) {
    throw new Error("Missing database credentials!");
  }
  return {
    port: Number(port),
    nodeEnv: nodeEnv!,
    dbName: dbName!,
    dbPassword: dbPassword!,
    dbUser: dbUser!,
    dbHost: dbHost!,
    jwtSecret: jwtSecret!,
    jwtPublicKeyPath: jwtPublicKeyPath!,
    jwtPrivateKeyPath: jwtPrivateKeyPath!,
    jwtExpiration: jwtExpiration!,
  };
};

export default envConfig();
