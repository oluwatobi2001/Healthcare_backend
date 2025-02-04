const AppointmentController  = require('../../controller/appointment.controller')
const express =  require("express");
const router = express.Router();
const {UserRegSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");
const { userLoggedIn } = require('../../middlewares/verifyUser');


router.route("/:providerId/new-appointment").post(userLoggedIn, AppointmentController.CreateAppointment);

router.route("/view-appointments").get(userLoggedIn, AppointmentController.ViewAppointments);

router.route("/confirm-appointment/:appointmentId").put( userLoggedIn, AppointmentController.confirmAppointment);

router.route("/cancel-appointment/:appointmentId").put(userLoggedIn, AppointmentController.CancelAppointment);



module.exports = router;
