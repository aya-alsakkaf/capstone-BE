const express = require("express");
const router = express.Router();
const reviewController = require("./review.controller");

// Route to create a new review
router.post("/reviews", reviewController.createReview);

// Route to get all reviews for a specific service
router.get("/reviews/service/:serviceId", reviewController.getServiceReviews);

// Route to get the average rating of a service
router.get(
  "/service/:serviceId/average-rating",
  reviewController.getAverageRating
);

module.exports = router;
