import crypto from "crypto";

const generateToken = () => crypto.randomBytes(16).toString("hex");

export default generateToken;
