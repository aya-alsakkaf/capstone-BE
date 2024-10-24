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

// Update PetDetail
exports.updatePetDetail = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const updatedPetDetail = await PetDetail.findByIdAndUpdate(
      petId,
      req.body,
      {
        new: true, // returns the updated document
        runValidators: true, // validate before updating
      }
    );

    if (!updatedPetDetail) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(updatedPetDetail);
  } catch (error) {
    next(error);
  }
};

// Delete PetDetail
exports.deletePetDetail = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const deletedPetDetail = await PetDetail.findByIdAndDelete(petId);

    if (!deletedPetDetail) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet detail deleted successfully" });
  } catch (error) {
    next(error);
  }
};
