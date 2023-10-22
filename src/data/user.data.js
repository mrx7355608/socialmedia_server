import User from "../models/user.model.js";

// 1) FIND USER BY EMAIL
const findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// 2) FIND USER BY ID
const findById = async (id) => {
  const user = await User.findById(id).populate(
    "friends",
    "fullname profile_picture"
  );
  return user;
};

// 3) ADD NEW USER IN DATABASE
const insert = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

// 4) UPDATE USER
const update = async (id, updates) => {
  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
  });
  return updatedUser;
};

// 5) DELETE USER
const deleteUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// 6) FIND USERS BY NAME (USED FOR SEARCH FUNCTONALITY)
const findByName = async (name) => {
  const users = await User.find({
    fullname: { $regex: new RegExp(name), $options: "i" },
  });
  return users;
};

const usersDB = {
  findByEmail,
  findById,
  findByName,
  insert,
  update,
  deleteUser,
};

export default usersDB;
