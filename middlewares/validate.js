const Joi = require("joi");


const UserRegSchema =  Joi.object({

    email: Joi.string().email({
        minDomainSegments: 2, 
        tlds: {
            allow: ['com', 'net']
        }
    }),
    firstName : Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    role: Joi.string().required(),
    password: Joi.string().alphanum().min(7).required(),
    role: Joi.string().required()

});


const ProviderRegSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2, 
        tlds: {
            allow: ['com', 'net']
        }
    }),
    description: Joi.string().required(),
    specialization : Joi.string().required(),
    location : Joi.array().required(),
    fee_cost : Joi.number().required(),



});

const AppointmentRegSchema = Joi.object({
    apppointmentDate : Joi.date().required()
})
const DonationReqSchema = Joi.object({
    title: Joi.string().required(),
    description:  Joi.string().required(),
    expiresOn: Joi.date(),
    goalAmount : Joi.number().required(),
})

module.exports = {UserRegSchema, DonationReqSchema};