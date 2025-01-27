const httpStatus = require('http-status');
const db = require('../model/');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const { error } = require('../middlewares/validate');
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;

const User = db.user;



const Login = async (userInfo) => {
    try {
      passport.authenticate('local');
    // Check if the email already exists in the database
    } catch (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, err);
    } 
  };

  module.exports = { Login};