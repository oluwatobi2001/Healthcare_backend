const httpStatus = require('http-status');
const db = require('../model/');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = db.user;
const Feedback =  db.Feedback;




