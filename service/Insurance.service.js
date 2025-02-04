const db = require('../model');

const Insurance  = db.Insurance

const createInsurance = async() => {
   try {
    const {
name, insuranceId, details
} = req.body;
const {providerId}  = req.params;
if( name || details ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Appointment date and provider ID are required.");
}
const AddInsurance =  await  Insurance.create({name, insuranceId, providerId, details})
console.log(AddInsurance);
if (!AddInsurance) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create appointment.");
}
return AddInsurance
   } catch(err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
   }

}


const editProviderInsurance = async(req) => {
    try {

    
    const {appointmentId} = req.params;
const {name, details, insuranceId} = req.body;
    if(!providerId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Appointment date and provider ID are required.");
    }
    const editInsurance = await Insurance.update({where: {id: appointmentId }}, {name, details, insuranceId})
console.log(editInsurance);
 
    return editInsurance
   } catch(err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
   }

 

}

const deleteProviderInsurance = async(req) => {
    try {
        const {appointmentId} = req.params;
        const deletedInsurance =  await Insurance.destroy(appointmentId);
        console.log(deletedInsurance);
 
    return deletedInsurance
  
   } catch(err) {
    console.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
   }

    }



const fetchProviderInsurance =async(req) => {

    try {

    
    const {providerId} = req.params;
    if(!providerId ) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Appointment date and provider ID are required.");
    }
    const providerInsurance  =  await Insurance.findAll({where : {providerId : providerId}})
    if(providerInsurance.length < 1) {
        return null
    } 
    console.log(providerInsurance)
    return providerInsurance
} catch(err) {

}
}

module.exports = {fetchProviderInsurance, deleteProviderInsurance, editProviderInsurance, createInsurance}