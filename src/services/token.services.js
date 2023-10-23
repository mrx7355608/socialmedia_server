import tokensDB from "../data/token.data.js";
import generateToken from "../utils/generateToken.js";

const listOneToken = async (type, userID) => {
  const token = await tokensDB.findOne(type, userID);
  return token;
};

const createNewToken = async (type, userID) => {
  const data = {
    token: generateToken(),
    type,
    userID
  };
  const newToken = await tokensDB.insert(data);
  return newToken;
};

const tokenServices = {
  createNewToken,
  listOneToken
};

export default tokenServices;
