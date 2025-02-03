const httpStatus = require('http-status');
const db = require('../model');
const ApiError = require('../utils/ApiError');
const User = db.user;
const Appointment = db.Appointment;
const Provider = db.Provider;

const createAppointment = async (req) => {
    try {
        const { appointmentDate } = req.body;
        const creatorInfo = req.user.id;
        const provider = req.params.providerId;

        if (!appointmentDate || !provider   || !creatorInfo) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Appointment date and provider ID are required.");
        }

        const appointment = await Appointment.create({
            patientId: creatorInfo,
            providerId: provider,
            appointmentDate
        });
        console.log(appointment);

        const expectedReminderTime =  new Date(appointmentDate) - (60* 1000 * 60 * 24);
        console.log(expectedReminderTime)
        const createReminder =  await db.Reminder.create({
          message: "your appointment is scheduled for tomorrow. Please note", appointmentId: appointment.id, reminder_time : expectedReminderTime

        })
        console.log("reminder succcessfully created")
        if (!appointment) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create appointment.");
        }
        if (!createReminder) {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create reminder.");
      }

        return appointment;
    } catch (err) {
        console.error(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const confirmAppointment = async (req) => {
    try {
        const appointmentId = req.params.appointmentId;
        const userId = req.user.id;

        const fetchAppointment = await Appointment.findOne({ where: { id: appointmentId } });
        if (!fetchAppointment) {
            throw new ApiError(httpStatus.NOT_FOUND, "Appointment not found.");
        }

        const provider = await Provider.findOne({ where: { userId } });
        if (!provider) {
            throw new ApiError(httpStatus.FORBIDDEN, "Only providers can confirm appointments.");
        }

        if (provider.id !== fetchAppointment.providerId) {
            throw new ApiError(httpStatus.FORBIDDEN, "You are not allowed to confirm this appointment.");
        }

        await Appointment.update({ status: "confirmed" }, { where: { id: appointmentId } });

        return { message: "Appointment confirmed successfully" };
    } catch (err) {
        console.error(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const getAllAppointments = async (req) => {
    try {
        const userId = req.user.id;
        const provider = await Provider.findOne({ where: { userId } });

        if (!provider) {
            throw new ApiError(httpStatus.FORBIDDEN, "Only providers can view appointments.");
        }

        const myAppointments = await Appointment.findAll({ where: { providerId: provider.id } });

        return myAppointments;
    } catch (err) {
        console.error(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const cancelAppointment = async (req) => {
    try {
        const appointmentId = req.params.appointmentId;
        const userId = req.user.id;

        const fetchAppointment = await Appointment.findOne({ where: { id: appointmentId } });
        if (!fetchAppointment) {
            throw new ApiError(httpStatus.NOT_FOUND, "Appointment not found.");
        }

        const provider = await Provider.findOne({ where: { userId } });
        if (!provider) {
            throw new ApiError(httpStatus.FORBIDDEN, "Only providers can cancel appointments.");
        }

        if (provider.id !== fetchAppointment.providerId) {
            throw new ApiError(httpStatus.FORBIDDEN, "You are not allowed to cancel this appointment.");
        }

        await Appointment.update({ status: "cancelled" }, { where: { id: appointmentId } });

        return { message: "Appointment cancelled successfully" };
    } catch (err) {
        console.error(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

module.exports = {
    createAppointment,
    confirmAppointment,
    cancelAppointment,
    getAllAppointments
};
