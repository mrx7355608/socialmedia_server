import jwt from "jsonwebtoken";

const JWTServices = () => {
  const jwtSecret = process.env.JWT_SECRET;

  const generateToken = (payload) =>
    // eslint-disable-next-line
    jwt.sign(payload, jwtSecret, { expiresIn: "5m" });

  const verifyToken = (token) => jwt.verify(token, jwtSecret);

  return { generateToken, verifyToken };
};

export default JWTServices;
