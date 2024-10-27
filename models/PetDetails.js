const mongoose = require("mongoose");

const PetDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  image: { type: String },
  birthdate: { type: Date },
  gender: { type: Boolean },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  VACS: [{ type: mongoose.Schema.Types.ObjectId, ref: "VAC" }],
  Appts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  allergies: { type: String },
  weight: { type: String },
  medication: { type: String },
});

module.exports = mongoose.model("PetDetail", PetDetailSchema);
