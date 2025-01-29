const UserController  = require('../../controller/User.controller')
const ProviderController=  require('../../controller/Provider.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");


router.route("/create-provider").post(ProviderController.createService);

router.route("/get-providers").get(ProviderController.getService);

router.route("/get-provider/:providerId").get(ProviderController.getAService);

router.route("/update-provider/:providerId").put(ProviderController.updateService);

router.route("/delete-provider/:providerId").delete(ProviderController.deleteService);

module.exports = router;
