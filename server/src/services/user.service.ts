import passwordHasher from "../helpers/generatePasswordHash";
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
  // Implement your login logic here
  return {
    success: false,
    message: "Email already used before!",
    data: null,
  };
};

export { registerService, loginService };
