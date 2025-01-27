const UserController  = require('../../controller/User.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");


router.route("/create-provider").post();

router.route("/get-providers").get();

router.route("/get-provider/:providerId").get();

router.route("/update-provider/:providerId").put();

router.route("/delete-provider/:providerId").delete();

module.exports = router;
