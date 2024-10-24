const Review = require("../../models/Review");
const Service = require("../../models/Services");

// Create a new review for a service
exports.createReview = async (req, res) => {
  try {
    const { rating, reviewText, serviceId, userId } = req.body;

    // Ensure service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Create the review
    const review = new Review({
      service: serviceId,
      rating,
      reviewText,
      user: userId,
    });

    const savedReview = await review.save();

    // Add the review to the service's reviews array
    service.reviews.push(savedReview._id);

    // Update average rating
    const totalReviews = service.reviews.length;
    const totalRating =
      (service.averageRating * (totalReviews - 1) + rating) / totalReviews;
    service.averageRating = totalRating;

    await service.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a specific service
exports.getServiceReviews = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;

    const reviews = await Review.find({ service: serviceId }).populate(
      "user",
      "username"
    ); // Optionally populate user details

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating of a service
exports.getAverageRating = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;

    const service = await Service.findById(serviceId).populate("reviews");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Return average rating and reviews count
    res.status(200).json({
      averageRating: service.averageRating,
      totalReviews: service.reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
