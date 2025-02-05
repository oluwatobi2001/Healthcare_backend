const httpStatus = require("http-status");
const { User, Provider } = require("../model");
const ApiError = require("../utils/ApiError");
const sendMail = require("./MailService");

const monitorActivities =async() => {

}
const downloadReport =async() => {

}


const sendBroadcast =async(req, res, next) => {

const {message}  =  req.body;
const msgHeader = "From Quad Health "

try  {
    const fetchAll =  await User.findAll();
    if(!fetchAll.length) {
        throw new ApiError(httpStatus.NOT_FOUND, " there is an issue with the db. please try again later")
    }
    for (userInfo in fetchAll) {
        const {email } =  userInfo;
        const sendBroadcast = await sendMail(email, msgHeader, message)


    }

} catch(err) {
    console.log(err)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
}
}
const ActiveUsers = async() => {
    try {
 const totalVerifiedUsers = await User.count({where: {isActive: true}});
 return totalVerifiedUsers;
    
    } catch(err) {
        console.log(err)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    
   


}

const ActiveProviders =async() => {
    try {
        const totalVerifiedUsers = await User.count({where: {isActive: true}});
        return totalVerifiedUsers;
           
           } catch(err) {
               console.log(err)
               throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
           }
           
          
}

const ApproveProvider =async(req) =>{
    const {providerId} = req.params;

    try{
        const setAdmin = await Provider.update({isApproved: true}, {where: {id: providerId}})
            
            return setAdmin
        } catch(err) {
            console.log(err)
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "user cannot be suspended now. Please try again later");
        }
            
}

const deleteProvider =() =>{

}
const suspendProvider =async(req) =>{
const {providerId} = req.params;

try{
    const setAdmin = await Provider.update({isSuspended: true}, {where: {id: providerId}})
        
        return setAdmin
    } catch(err) {
        console.log(err)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "user cannot be suspended now. Please try again later");
    }
        
}

const makeAdmin = async(req) => {
    const {userId} = req.params;

try{
const setAdmin = await User.update({role: "admin"}, {where: {id: userId}})
    
    return setAdmin
} catch(err) {
    console.log(err)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
}
    
    
}
module.exports = {ActiveUsers, ActiveProviders, sendBroadcast, ApproveProvider, deleteProvider, suspendProvider, makeAdmin}