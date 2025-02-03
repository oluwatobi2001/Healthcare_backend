const UserController  = require('../../controller/User.controller')
const ProviderController=  require('../../controller/Provider.controller')
const express =  require("express");
const router = express.Router();
const { ProviderRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");
const { userLoggedIn } = require('../../middlewares/verifyUser');



const validateCreateProvider = (req, res, next) => {
    const { error } = ProviderRegSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();  // If validation is successful, proceed to the next middleware
};

router.route("/create-provider").post(userLoggedIn,  validateCreateProvider, ProviderController.createService);

router.route("/get-providers").get(userLoggedIn, ProviderController.getService);

router.route("/get-provider/:providerId").get(userLoggedIn, ProviderController.getAService);

router.route("/update-provider/:providerId").put(userLoggedIn, ProviderController.updateService);

router.route("/delete-provider/:providerId").delete(userLoggedIn, ProviderController.deleteService);

module.exports = router;
