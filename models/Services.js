const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  serviceType: { type: Boolean, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  details: { type: String },
  Appts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

module.exports = mongoose.model("Services", ServicesSchema);
