const UserController  = require('../../controller/User.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth")


router.route("/:providerId/all-ratings").get()

router.post("/:providerId/rate").post();

router.delete("/:rateId").delete();

