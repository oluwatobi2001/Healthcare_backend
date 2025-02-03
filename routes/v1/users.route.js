const UserController  = require('../../controller/User.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const {isUserVerified, isUserAdmin, userLoggedIn} = require("../../middlewares/verifyUser")

const validateCreateUser = (req, res, next) => {
    const { error } = UserRegSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();  // If validation is successful, proceed to the next middleware
};

router.route("/").post(validateCreateUser ,  UserController.createUser);
router.route("/verify-otp").post(UserController.verifyAccount)
router.route('/:id?').get(userLoggedIn, UserController.getUser);
router.route('/:id').put(   UserController.updateUser);
router.route('/:id').delete(  isUserAdmin,  isUserVerified, userLoggedIn, UserController.deleteUser)


module.exports = router;