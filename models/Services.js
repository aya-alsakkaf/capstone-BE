const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ["Vet Clinic", "Grooming Service", "other"],
    required: true,
  },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  details: { type: String },
  Appts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of reviews
  averageRating: { type: Number, default: 0 }, // Average rating of the servic
});

module.exports = mongoose.model("Services", ServicesSchema);
