const httpStatus = require("http-status");
const { User } = require("../model");
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

const ApproveProvider =() =>{

}

const deleteProvider =() =>{

}
const suspendProvider =() =>{

}

module.exports = {ActiveUsers, ActiveProviders, sendBroadcast, ApproveProvider, deleteProvider, suspendProvider}