const User = require("../models/userModel");

const createUser = async (email, username, password) => {
  const user = await User.create({
    username,
    email,
    password,
  });

  return user.save();
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "updatedAt"] },
  });

  return users;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
};

module.exports = { createUser, getAllUsers, getUserByEmail };
