

const userLoggedIn =async(req, res, next) => {

    if(req) {
         const confirmUser = await req.isAuthenticated();
         if (!confirmUser) {
            return res.status(400).json({msg: "You cannot access this service. Please login"})
         }
else {
    next();
}

    } 
    
}
const isUserVerified =async(req, res, next) => {
    const {user }= req;
    if (id == null) {
        res.status(400).json({msg: "You cannot access this service. Please login"})
    }
   if(!user.isVerified) {
    return res.status(400).json({msg: "Please you havent verified your email address. CHeck your email for the verification code"})
   } else{
    next();

   }

}
const isUserProvider  =async(req, res, next)  => {
    const {role} = req.user;
    if (role !== "provider") {
        res.status(400).json({msg: "You cannot access this service."})
    }

    else {
    next();

   }
}

const isUserAdmin =async(req, res, next) => {
    const {role} = req.user;
    if (role !== "admin") {
        res.status(400).json({msg: "You cannot access this service."})
    }

    else {
    next();

   }
}

module.exports = {isUserAdmin,  isUserProvider, userLoggedIn, isUserVerified}

