const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService, providerService } = require('../service');

const createService = async (req, res, next) => {
  try {
    const provider = await providerService.createProvider(req);
    console.log("Request Body:", req.body);
    console.log("Authenticated User:", req.user);

    res.status(httpStatus.CREATED).send({
      msg: "User successfully created. Kindly check your mail to verify your account."
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    if (!providerId) throw new ApiError(httpStatus.BAD_REQUEST, "Provider ID is required");

    await providerService.deleteProvider(providerId);
    res.status(httpStatus.NO_CONTENT).send({
      msg: "User successfully deleted"
    });
  } catch (error) {
    next(error);
  }
};

const getService = async (req, res, next) => {
  try {
    const users = await providerService.findHealthService(req);
    if (!users || users.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, "Users not found");
    }
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getAService = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

    const user = await providerService.findHealthService(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    if (!providerId) throw new ApiError(httpStatus.BAD_REQUEST, "Provider ID is required");

    console.log("Updating Provider ID:", providerId);
    const updatedUser = await providerService.editProvider(req);
    
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getService,
  getAService
};
