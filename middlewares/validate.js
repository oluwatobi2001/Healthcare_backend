const Joi = require("joi");


const UserRegSchema =  Joi.object({

    email: Joi.string().email({
        minDomainSegments: 2, 
        tlds: {
            allow: ['com', 'net']
        }
    }),
    firstName : Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    role: Joi.string(),
    phoneNumber: Joi.string().pattern(/^\d{1,11}$/),
    password: Joi.string().alphanum().min(7).required(),
    
    gender: Joi.string()

});


const ProviderRegSchema = Joi.object({
   
    name: Joi.string().min(2).required(),
    address: Joi.string().min(5).required(),
    contactInfo : Joi.string(),

    description: Joi.string().required(),
    specialization : Joi.string().required(),
    location : Joi.object().required(),
    feeCost : Joi.number().required(),



});
const InsuranceRegSchema = Joi.object({

})

const AppointmentRegSchema = Joi.object({
    apppointmentDate : Joi.date().required()
})

module.exports = {UserRegSchema, ProviderRegSchema};