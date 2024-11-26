type RegisterProps = {
  username: string;
  password: string;
  email: string;
};
type LoginProps = {
  password: string;
  email: string;
};

const registerService = async (data: RegisterProps): Promise<any> => {
  // Implement your registration logic here
  return {};
};
const loginService = async (data: LoginProps): Promise<any> => {
  // Implement your login logic here
  return {};
};

export { registerService, loginService };
