import envConfig from "../config/env.config";
import generateAccessToken from "../helpers/generateJWT";
import passwordHasher from "../helpers/generatePasswordHash";
import passwordVerifier from "../helpers/passwordVerify";
import User from "../models/user.model";
import { IResponse } from "../types/response.type";

type RegisterProps = {
  username: string;
  password: string;
  email: string;
};
type LoginProps = {
  password: string;
  email: string;
};

const registerService = async (data: RegisterProps): Promise<IResponse> => {
  const isExit = await User.exists({ email: data?.email });

  if (isExit) {
    return {
      success: false,
      message: "Email already used before!",
      data: null,
    };
  }

  const newData = {
    ...data,
    password: await passwordHasher(data?.password),
  };

  const result = await User.create(newData);
  const newResult = await User.findById(result?._id).select("-password -__v");

  return {
    success: true,
    message: "Registration successful!",
    data: newResult,
  };
};

const loginService = async (data: LoginProps): Promise<IResponse> => {
  const user = await User.findOne({ email: data?.email }).select(
    "-createdAt -updatedAt -__v"
  );
  if (!user) {
    return {
      success: false,
      message: "Email not found!",
      data: null,
    };
  }
  const isMatched = await passwordVerifier(data?.password, user.password);

  if (!isMatched) {
    return {
      success: false,
      message: "Incorrect password!",
      data: null,
    };
  }
  const newData = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const result = {
    ...newData,
    accessToken:
      "Bearer " +
      (await generateAccessToken({
        payload: newData,
        secretKey: envConfig.jwtSecret,
        expiresIn: envConfig.jwtExpiration,
      })),
  };

  return {
    success: true,
    message: "Login successful!",
    data: result,
  };
};

export { loginService, registerService };
