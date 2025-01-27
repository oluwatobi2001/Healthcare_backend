const UserController  = require('../../controller/User.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth")

const validateCreateUser = (req, res, next) => {
    const { error } = UserRegSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();  // If validation is successful, proceed to the next middleware
};

router.route("/").post(validateCreateUser ,  UserController.createUser);
router.route('/:id?').get(getAuthenticated, UserController.getUser);
router.route('/:id').put(getAuthenticated,   validateCreateUser, UserController.updateUser);
router.route('/:id').delete(getAuthenticated, UserController.deleteUser)


module.exports = router;