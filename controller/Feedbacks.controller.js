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

  
    if (!providerId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Provider ID is required');
    }

    const createFeedback = await FeedbackService.fetchFeedbacks(req);
    console.log('Appointment created:', createFeedback);

    res.status(httpStatus.CREATED).send({
      msg: 'Appointment successfully created. Please check your email to verify the appointment.',
      data: createFeedback, 
    });
  } catch (error) {
    next(error); 
  }
}

const deleteReview =async(req, res, next) => {
try {

    const {feedbackId } = req.params;

  if (!feedbackId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'feedbackID is required');
  }

  const deleteReview = await  FeedbackService.deleteFeedbacks(req)
  console.log('feedback deleted', deleteReview);

    res.status(httpStatus.CREATED).send({
      msg: 'Appointment successfully deleted.',
     
    });
} catch(err) {
  next(err); 
}
}



const EditReview = async(req, res, next) => {
  try {

    const {feedbackId } = req.params;

  if (!feedbackId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'feedbackID is required');
  }

  const editReview = await  FeedbackService.editFeedbacks(req)
  console.log('feedback edited', editReview);

    res.status(httpStatus.CREATED).send({
      msg: 'Appointment successfully edited',
     
    });
} catch(err) {
  next(err); 
}

}

module.exports ={
    GiveReview, fetchReviews, deleteReview, EditReview
}