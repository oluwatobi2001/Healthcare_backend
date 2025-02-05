const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('../service');


const createUser = async( req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Unhandled error in createUserHandler:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred." });
  }
}
const verifyAccount = async(req, res, next) => {
const user = await userService.AccountVerification(req.body);
if (user == '') {
  throw new ApiError(httpStatus.NOT_FOUND, 'Verification unsuccessful');
}
else {
res.status(200).send({msg: "Account successfuly verified.  Now you can login"})
}

}


const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(httpStatus.NO_CONTENT).send({msg: "User successfully deleted"});
  };

  
const getUser = async (req, res) => {
    const user = await userService.fetchUser(req.params.id);
    if (user == '') {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    console.log(user)
    res.send(user);
  };
  const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.send(user);
  };  

  module.exports = {
    updateUser, getUser, deleteUser, createUser, verifyAccount
  }