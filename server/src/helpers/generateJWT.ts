import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

type AccessTokenOptions = {
  payload: string | Buffer | object;
  secretKey: string;
  expiresIn: string;
};

const generateAccessToken = async ({
  payload,
  secretKey,
  expiresIn,
}: AccessTokenOptions): Promise<string> => {
  try {
    let signingKey = secretKey;

    if (secretKey.startsWith("/") || secretKey.endsWith(".key")) {
      const resolvedPath = path.resolve(secretKey);
      signingKey = await fs.readFile(resolvedPath, "utf-8");
    }

    const isRSAPrivateKey =
      signingKey.includes("-----BEGIN PRIVATE KEY-----") ||
      signingKey.includes("-----BEGIN RSA PRIVATE KEY-----");

    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid payload provided.");
    }
    if (!expiresIn || typeof expiresIn !== "string") {
      throw new Error("Invalid 'expiresIn' value provided.");
    }

    const token = jwt.sign(payload, signingKey, {
      expiresIn,
      algorithm: isRSAPrivateKey ? "RS512" : "HS512",
    });

    return token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token.");
  }
};

export default generateAccessToken;
