const Owner = require("../../models/Owner");
const PetDetail = require("../../models/PetDetails");

// Create PetDetail
exports.createPetDetail = async (req, res, next) => {
  try {
    console.log(req.body);
    const birthDate = new Date(req.body.birthDate);
    console.log(birthDate);
    // Add owner ID to the pet details
    const petData = { ...req.body, owner: req.user._id, birthDate };
    const petDetail = await PetDetail.create(petData);
    console.log("petDetail");
    await Owner.findByIdAndUpdate(req.user._id, {
      $push: { pets: petDetail._id },
    });
    console.log("owner updated");
    res.status(201).json(petDetail);
  } catch (error) {
    next(error);
  }
};

// Get all PetDetails
exports.getPetDetails = async (req, res, next) => {
  try {
    // Filter pets by owner ID
    const pets = await PetDetail.find({ owner: req.user._id }).populate(
      "VACS Appts"
    );
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};

// Update PetDetail
exports.updatePetDetail = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const updatedPetDetail = await PetDetail.findOneAndUpdate(
      { _id: petId, owner: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPetDetail) {
      return res.status(404).json({
        message: "Pet not found or you're not authorized to update it",
      });
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
    const deletedPetDetail = await PetDetail.findOneAndDelete({
      _id: petId,
      owner: req.user._id,
    });

    if (!deletedPetDetail) {
      return res.status(404).json({
        message: "Pet not found or you're not authorized to delete it",
      });
    }

    res.status(200).json({ message: "Pet detail deleted successfully" });
  } catch (error) {
    next(error);
  }
};
