const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "PetDetail" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
  image: { type: String },
});

module.exports = mongoose.model("Owner", OwnerSchema);
