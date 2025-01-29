const httpStatus = require('http-status');
const db = require('../model');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = db.user;
const Token  = db.token;
const Appointment   = db.Appointment
const sendMail  = require('./MailService');

const Provider =  db.Provider

const generateOtp =(len)=> {
  const digits = '123456789';
  let OTP = '';
  for (let i = 0; i < len; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
  
};


const createUser = async (userInfo) => {
  try {
    // Check if the email already exists in the database
    const ifEmailExists = await User.findOne({ where: { email: userInfo.email } });
    if (ifEmailExists) {
      throw new ApiError('Email has already been registered');
    }

    // Validate password complexity (optional but recommended)
    if (userInfo.password.length < 8) {
      throw new ApiError('Password must be at least 8 characters long');
    }

    // Hash the user's password before saving to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

    // Update the userInfo object with the hashed password
    const newUserInfo = {
      ...userInfo,
      password: hashedPassword,
    };

    // Create the new user in the database
    const newUser = await User.create(newUserInfo);

    // Generate OTP
    const otpDigit = generateOtp(6) // Ensure this function is defined or imported
    console.log(`Generated OTP: ${otpDigit}`);

    // Prepare and create the token
    const tokenData = {
      userId: newUser.id,
      otpNo: otpDigit, // Store OTP if needed
      expiryTime: new Date(Date.now() + 10 * 60 * 1000), // Example: OTP expires in 10 minutes
    };

    await Token.create(tokenData);

    const EmailSub = 'Account VerificationInfo'

    const mailVerification = await sendMail(  newUser.email, EmailSub, otpDigit )
    if (mailVerification) {
      console.log("email  successfully sent");

    }
    return newUser; // Optionally return the created user
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error; // Re-throw the error for higher-level handling
  }
};

  const forgotPassword = () => {

  }
  const completeProfile = () => {

  }

  const AccountVerification= async(otpInfo) => {

    const userOtp =    parseInt(otpInfo.otp) ;

try {
   const  confirmOtp =  await  Token.findOne({ where: {otpNo: userOtp} })

    if (confirmOtp )  {
      
     const updatedUser =  await User.update({isVerified : true}, { where : {id: confirmOtp.userId} })
     if (updatedUser) {
    console.log(updatedUser)
    return updatedUser
     }
    }

} catch(err) {
  throw err;
}
   
  }

  const findHealthService = async() => {
    try {
       const allServices =  await Provider.findAll();
       console.log(allServices)

       return allServices
    } catch (err) {
      throw err
    }

   



  }
  const scheduleAppointment = async()=> {
const providerDets = req.params.providerId;
    const {date} =  req.body;
    const appointmentDetails = 
     {
      patientId : req.user.id,
      appointmentDate : date,
      providerId : providerDets,
      status: 'pending'
    }
    try {
       const newAppointment = await Appointment.create( appointmentDetails);
    if(!newAppointment){
      throw new ApiError()

 }
 else {
  return newAppointment;
 }
    } catch (err) {
      throw err
    }
   

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
  FetchUser,
  AccountVerification,
  findHealthService, 
  scheduleAppointment
    
  };
  