const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService , providerService} = require('../service');



const createService = async( req, res, next) => {
    const provider = providerService.createProvider(req);
    console.log(req)
    console.log(provider)

    res.status(httpStatus.CREATED).send({msg: "User successfully created. Kindly check your mail to verify your account. "});
}



const deleteService = async (req, res) => {
    await providerService.deleteProvider(req.params.providerId);
    res.status(httpStatus.NO_CONTENT).send({msg: "User successfully deleted"});
  };

  
const getService = async (req, res) => {
    const user = await providerService.findHealthService();
    if (user == '') {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    console.log(user)
    res.send(user);
  };
    
const getAService = async (req, res) => {
  const user = await providerService.findHealthService(req.params.id);
  if (user == '') {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  console.log(user)
  res.send(user);
};
  const updateService = async (req, res) => {
    const user = await providerService.editProvider(req.params.id, req.body);
    res.send(user);
  };  



  module.exports = {
  createService, updateService, deleteService, getService, getAService
  }