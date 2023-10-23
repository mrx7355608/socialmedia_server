import jwt from "jsonwebtoken";

const JWTServices = () => {
  const jwtSecret = process.env.JWT_SECRET;

  const generateToken = (payload) => jwt.sign(payload, jwtSecret);
  const verifyToken = (token) => jwt.verify(token, jwtSecret);

  return { generateToken, verifyToken };
};

export default JWTServices;
