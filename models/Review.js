const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  services: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    required: true,
  }, // Reference to the service
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
  reviewText: { type: String, required: true },
  Owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true }, // Reference to the owner (user)
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
