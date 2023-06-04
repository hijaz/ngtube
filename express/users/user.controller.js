const User = require("./user.schema");

// Create a new User
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error creating a new user", error);
    throw error;
  }
};

// Read All the users
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error reading all the users", error);
    throw error;
  }
};

// Read a specific user
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error reading user by id", error);
    throw error;
  }
};

// Read a specific user by username
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    console.error("Error reading user by username", error);
    throw error;
  }
};

// Update a user
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deleteUser;
  } catch (error) {
    console.error("Error deleting the user");
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
};
