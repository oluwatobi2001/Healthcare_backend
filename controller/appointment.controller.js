const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');  // Assuming you have a custom error handler
const { AppointmentService } = require('../service');

/**
 * Controller to handle creating appointments.
 */
const CreateAppointment = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    console.log(`Creating appointment for provider with ID: ${providerId}`);

    // Make sure providerId is present, otherwise return error
    if (!providerId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Provider ID is required');
    }

    const createAppointment = await AppointmentService.createAppointment(req);
    
    console.log('Appointment created:', createAppointment);

    res.status(httpStatus.CREATED).send({
      msg: 'Appointment successfully created. ',
       // Sending created appointment data in response
    });
  } catch (error) {
    next(error);  // Delegate to the global error handler
  }
};

/**
 * Controller to view all appointments.
 */
const ViewAppointments = async (req, res, next) => {
  try {
    const appointments = await AppointmentService.getAllAppointments(req);
    console.log('Appointments retrieved:', appointments);

    if (!appointments.length) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No appointments found');
    }

    res.status(httpStatus.OK).send({
      msg: 'Appointments successfully fetched.',
      data: appointments,  // Returning list of appointments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to cancel an appointment.
 */
const cancelAppointment = async (req, res, next) => {
  try {
    const canceledAppointment = await AppointmentService.cancelAppointment(req);
    console.log('Appointment canceled:', canceledAppointment);

    if (!canceledAppointment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found or already canceled');
    }

    res.status(httpStatus.OK).send({
      msg: 'Appointment successfully canceled.',
   // Return canceled appointment details
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to confirm an appointment.
 */
const confirmAppointment = async (req, res, next) => {
  try {
    const confirmedAppointment = await AppointmentService.confirmAppointment(req);
    console.log('Appointment confirmed:', confirmedAppointment);

    if (!confirmedAppointment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }

    res.status(httpStatus.OK).send({
      msg: 'Appointment successfully confirmed.',
      data: confirmedAppointment,  // Return confirmed appointment details
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to edit/update an appointment.
 */
const EditAppointment = async (req, res, next) => {
  try {
    const updatedAppointment = await AppointmentService.updateAppointment(req);
    console.log('Appointment updated:', updatedAppointment);

    if (!updatedAppointment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }

    res.status(httpStatus.OK).send({
      msg: 'Appointment successfully updated.',
      data: updatedAppointment,  // Return updated appointment details
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateAppointment,
  ViewAppointments,
  cancelAppointment,
  confirmAppointment,
  EditAppointment,
};
