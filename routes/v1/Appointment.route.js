const UserController  = require('../../controller/User.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");


router.route("/new-appointment").post();

router.route("/view-appointments").get();

router.route("/confirm-appointment/:providerId").put();

router.route("/cancel-appointment/:providerId").put();



module.exports = router;
