const Appointment = require("../../models/Appointment");
const Owner = require("../../models/Owner");
const PetDetail = require("../../models/PetDetails");
const VAC = require("../../models/VAC");

// Create PetDetail
exports.createPetDetail = async (req, res, next) => {
  try {
    console.log(req.body);
    const birthDate = new Date(req.body.birthDate);
    console.log(birthDate);

    // Prepare pet data with empty arrays for Appts and VACS
    const petData = {
      ...req.body,
      owner: req.user._id,
      image: req.file ? req.file.path : null,
      birthDate,
      gender: req.body.gender === "Male" ? true : false,
      Appts: [],
      VACS: [],
    };
    const petDetail = await PetDetail.create(petData);

    // Handle appointments if provided
    const appointments =
      req.body.Appts && Array.isArray(req.body.Appts)
        ? await Promise.all(
            req.body.Appts.map(async (appointment) => {
              const newApp = await Appointment.create({
                ...appointment,
                pet: petDetail._id,
              });
              return newApp._id;
            })
          )
        : [];

    // Handle vaccinations if provided
    const vacs =
      req.body.VACS && Array.isArray(req.body.VACS)
        ? await Promise.all(
            req.body.VACS.map(async (vac) => {
              const newVac = await VAC.create({ ...vac, pet: petDetail._id });
              return newVac._id;
            })
          )
        : [];

    // Update the petDetail document with the new Appts and VACS
    petDetail.Appts = appointments;
    petDetail.VACS = vacs;
    await petDetail.save();

    // Update the owner document with the new pet
    await Owner.findByIdAndUpdate(req.user._id, {
      $push: { pets: petDetail._id },
    });

    console.log("Owner updated and petDetail created");
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

// Get single PetDetail by ID
exports.getPetDetailById = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const petDetail = await PetDetail.findOne({
      _id: petId,
      owner: req.user._id,
    });

    if (!petDetail) {
      return res.status(404).json({
        message: "Pet not found or you're not authorized to view it",
      });
    }

    res.status(200).json(petDetail);
  } catch (error) {
    next(error);
  }
};
