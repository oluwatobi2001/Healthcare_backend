
const express =  require("express");
const { Feedback } = require("../../model");
const { fetchReviews, GiveReview, deleteReview, EditReview } = require("../../controller/Feedbacks.controller");
const router = express.Router();




router.route("/:providerId/all-ratings").get(fetchReviews)

router.route("/:providerId/rate").post(GiveReview);

router.route("/:rateId").delete(deleteReview);
router.route("/:rateId").put(EditReview);

module.exports = router;