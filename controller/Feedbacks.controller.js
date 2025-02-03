const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('../service');

const {FeedbackService} = require("../service")

const  GiveReview =async(req, res, next) => {
    try {
        const { providerId } = req.params;
        console.log(`Creating appointment for provider with ID: ${providerId}`);
    
        // Make sure providerId is present, otherwise return error
        if (!providerId) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Provider ID is required');
        }
    
        const createFeedback = await FeedbackService.submitFeedback(req);
        console.log('Appointment created:', createFeedback);
    
        res.status(httpStatus.CREATED).send({
          msg: 'Appointment successfully created. Please check your email to verify the appointment.',
          data: createFeedback,  // Sending created appointment data in response
        });
      } catch (error) {
        next(error);  // Delegate to the global error handler
      }
    
}

const fetchReviews =async(req, res, next ) => {
  try {
    const { providerId } = req.params;
    console.log(`Creating appointment for provider with ID: ${providerId}`);

    // Make sure providerId is present, otherwise return error
    if (!providerId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Provider ID is required');
    }

    const createFeedback = await FeedbackService.fetchFeedbacks(req);
    console.log('Appointment created:', createFeedback);

    res.status(httpStatus.CREATED).send({
      msg: 'Appointment successfully created. Please check your email to verify the appointment.',
      data: createFeedback,  // Sending created appointment data in response
    });
  } catch (error) {
    next(error);  // Delegate to the global error handler
  }
}

const deleteReview =() => {

}



const EditReview = () => {


}

module.exports ={
    GiveReview, fetchReviews, deleteReview, EditReview
}