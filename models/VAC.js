const mongoose = require("mongoose");

const VACSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetDetail",
    required: true,
  },
});

module.exports = mongoose.model("VAC", VACSchema);
