const PetDetail = require("../../models/PetDetails");

// Create PetDetail
exports.createPetDetail = async (req, res, next) => {
  try {
    const petDetail = await PetDetail.create(req.body);
    res.status(201).json(petDetail);
  } catch (error) {
    next(error);
  }
};

// Get all PetDetails
exports.getPetDetails = async (req, res, next) => {
  try {
    const pets = await PetDetail.find().populate("VACS Appts");
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};
