import bcrypt from "bcryptjs";

const passwordHasher = async (password: string) => {
  const hash = bcrypt.hashSync(password, 14);
  return hash;
};

export default passwordHasher;
