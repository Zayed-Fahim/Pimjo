import bcrypt from "bcryptjs";

const passwordVerifier = async (password: string, hash: string) => {
  const isMatched = bcrypt.compareSync(password, hash);

  return isMatched;
};

export default passwordVerifier;
