const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "PetDetail" }],
});

module.exports = mongoose.model("Owner", OwnerSchema);
