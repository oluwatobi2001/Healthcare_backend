const httpStatus = require('http-status');
const db = require('../model');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = db.user;
const Token  = db.token;

const Provider = db.Provider

const createProvider = async(req) => {

    
try {
const {description, feeCost,  location, specialization } = req.body;
console.log(req.user)
const creatorInfo = req.user.id

    const providerDetails  = {
        description , feeCost, location, specialization, userId: creatorInfo
    }

    const newProvider = await Provider.create(providerDetails)
    if(!newProvider ) {
        throw new ApiError()
    }

    else {
        console.log(newProvider)
      return newProvider  
    } 
}
catch (err) {

}


}

const editProvider =() => {

}

const deleteProvider = async(providerId) => {
console.log(providerId)
try {
    const deleteProvider = await Provider.destroy({ where: {id: providerId} })
    console.log(deleteProvider)

} catch(err) {
    console.log(err)
    throw new Error
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
module.exports = {
 createProvider,
 editProvider,
 deleteProvider,
 findHealthService
    
  };
  