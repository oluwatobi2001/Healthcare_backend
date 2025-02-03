const httpStatus = require('http-status');
const db = require('../model/');
const ApiError = require('../utils/ApiError');
const User = db.user;
const Feedback = db.Feedback;

const submitFeedback = async (req) => {
    try {
        const { id } = req.user;
        const { providerId } = req.params;
        const { rating, comment } = req.body;

        // Validate required fields
        if (!rating || !comment) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Rating and comment are required.");
        }

        const newFeedback = await Feedback.create({
            rating,
            comment,
            patient_id: id,
            provider_id: providerId
        });

        return newFeedback;
    } catch (err) {
        console.error("Error submitting feedback:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const fetchFeedbacks = async (req) => {
    try {
        const providerId = req.params.providerId;

        const serviceFeedback = await Feedback.findAll({
            where: { provider_id: providerId }
        });

        if (!serviceFeedback || serviceFeedback.length === 0) {
            throw new ApiError(httpStatus.NOT_FOUND, "No feedback available for this provider.");
        }

        return serviceFeedback;
    } catch (err) {
        console.error("Error fetching feedbacks:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

module.exports = {
    submitFeedback,
    fetchFeedbacks
};
