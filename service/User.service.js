const httpStatus = require('http-status');
const db = require('../model');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const sendMail = require('./MailService');

const { User, Token, Provider, Appointment } = db;

const generateOtp = (len) => {
  const digits = '123456789';
  let OTP = '';
  for (let i = 0; i < len; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)];
  }
  return OTP;
};

const createUser = async (userInfo) => {
  try {
    // Check if the email already exists
    const emailExists = await User.findOne({ where: { email: userInfo.email } });
    if (emailExists) {
      return { status: httpStatus.BAD_REQUEST, message: 'Email is already registered.' };
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const newUser = await User.create({ ...userInfo, password: hashedPassword });

    // Generate OTP
    const otpDigit = generateOtp(6);
    const createdToken = await Token.create({
      userId: newUser.id,
      otpNo: otpDigit,
      expiryTime: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("Generated OTP:", otpDigit);
    console.log("Created Token:", createdToken);

    // Send verification email
    try {
      await sendMail(newUser.email, 'Account Verification Info', otpDigit);
      console.log("Email successfully sent.");
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return { status: httpStatus.INTERNAL_SERVER_ERROR, message: 'User created, but failed to send verification email.' };
    }

    return { status: httpStatus.CREATED, message: "User created successfully. OTP sent for verification." };

  } catch (error) {
    console.error("Error in createUser:", error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: "Something went wrong. Please try again later." };
  }

}
const forgotPassword = async (req) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is required.");
    }

    const userAccount = await User.findOne({ where: { email } });
    if (!userAccount) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    const otpDigit = generateOtp(6);
    await Token.create({
      userId: userAccount.id,
      otpNo: otpDigit,
      expiryTime: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendMail(userAccount.email, 'Password Reset OTP', otpDigit);
    console.log("Password reset OTP sent.");

    return { message: "OTP sent to your email for password reset." };
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const completeProfile = async (req) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    await User.update(req.body, { where: { id: userId } });

    return { message: "Profile updated successfully." };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const accountVerification = async (otpInfo) => {
  try {
    const userOtp = parseInt(otpInfo.otp, 10);
    const token = await Token.findOne({ where: { otpNo: userOtp } });

    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP.");
    }

    await User.update({ isVerified: true }, { where: { id: token.userId } });

    return { message: "Account verified successfully." };
  } catch (error) {
    console.error("Error verifying account:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findHealthService = async () => {
  try {
    const allServices = await Provider.findAll();
    return allServices;
  } catch (error) {
    console.error("Error fetching health services:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const scheduleAppointment = async (req) => {
  try {
    const { providerId } = req.params;
    const { date } = req.body;

    if (!date) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Appointment date is required.");
    }

    const newAppointment = await Appointment.create({
      patientId: req.user.id,
      appointmentDate: date,
      providerId,
      status: 'pending',
    });

    return { message: "Appointment scheduled successfully.", appointment: newAppointment };
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const fetchUser = async (userId) => {
  try {
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
      }
      return user;
    }

    const users = await User.findAll();
    if (!users.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No users found.");
    }

    return users;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist.");
    }

    await User.destroy({ where: { id: userId } });

    return { message: "User deleted successfully." };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUser = async (userId, userDetails) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist.");
    }

    await User.update(userDetails, { where: { id: userId } });

    const updatedUser = await User.findOne({ where: { id: userId } });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  fetchUser,
  accountVerification,
  findHealthService,
  scheduleAppointment,
  forgotPassword,
  completeProfile,
};
