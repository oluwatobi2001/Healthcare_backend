const httpStatus = require('http-status');
const db = require('../model/');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = db.user;

const createUser = async (userInfo) => {
    try {
      // Check if the email already exists in the database
      const ifEmailExists = await User.findOne({ where: { email: userInfo.email } });
      
      if (ifEmailExists) {
        throw new ApiError('Email has already been registered');
      }
    
    // Hash the user's password before saving to the database
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

    // Update the userInfo object with the hashed password
    const newUserInfo = {
      ...userInfo,
      password: hashedPassword, // Store the hashed password
    };

    // Create the new user
    const newUser = await User.create(newUserInfo);

    return newUser; // Return the created user object
  } catch (error) {
    // Handle errors such as validation or uniqueness constraint
    throw error;
  }

  };
  const forgotPassword = () => {

  }
  const completeProfile = () => {

  }

  const AccountVerification= () => {

  }

  const findHealthService = () => {

  }
  const scheduleAppointment = ()=> {

  }

  const submitFeedback = () => {

  }
  const monitorActivities =() => {

  }
  const downloadReport =() => {

  }
const FetchUser = async (userId) => {
  let userDets;

  if (userId) {
    // Fetch a single user by ID if userId is provided
    userDets = await User.findOne({ where: { id: userId } });
    
    // Check if the user exists
    if (!userDets) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  } else {
    // Fetch all users if no userId is provided
    userDets = await User.findAll();
    
    // Check if any users were found
    if (userDets.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
    }
  }

  console.log(userDets); // Log the user data
  return userDets; // Return the fetched user(s)
};


const deleteUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }
  
  // Delete the user
  await user.destroy();
  
  console.log('Deleted user:', user); // Log the deleted user
  return user; // Return the deleted user object (useful for confirmation)
};



const updateUser = async (userId, userDetails) => {
  // First, find the user by their ID
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  // Update the user with the new details
  await User.update(userDetails, { where: { id: userId } });

  // Fetch the updated user to return it
  const updatedUser = await User.findOne({ where: { id: userId } });

  console.log('Updated user:', updatedUser); // Log the updated user
  return updatedUser; // Return the updated user object
};

 
module.exports = {
    createUser,
    updateUser,
  deleteUser,
  FetchUser
    
  };
  