import Token from "../models/token.model.js";

const findOne = async (type, userID) => {
  const tokens = await Token.findOne({ type, userID });
  return tokens;
};

const insert = async (data) => {
  const newToken = await Token.create(data);
  return newToken;
};

const tokensDB = {
  findOne,
  insert
};

export default tokensDB;
