import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const createToken = (
  id: number,
  role: string,
  secret: string | undefined
) => {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ id, role }, secret, { expiresIn: "3h" });
  return token;
};
export const verifyToken = (token: string, secret: string) => {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded
  } catch (error) {
    throw new Error("Invalid token")
  }
};
export const comparePassword = async(password: string, hashedPassword: string)=> {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}
