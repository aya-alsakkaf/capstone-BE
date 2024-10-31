const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const ServicesSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ["Vet Clinic", "Grooming Service", "other"],
    required: true,
  },
  phone: { type: String, required: true },
  image: { type: String },
  name: { type: String, required: true },
  location: { type: LocationSchema, required: true }, // Added location field
  Appts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Services", ServicesSchema);
