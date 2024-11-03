const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    required: true,
  },
  notes: { type: String },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetDetail",
    required: true,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
