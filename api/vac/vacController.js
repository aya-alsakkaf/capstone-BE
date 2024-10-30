const VAC = require("../../models/VAC");

// Create a VAC
exports.createVAC = async (req, res, next) => {
  try {
    const vac = await VAC.create(req.body);
    res.status(201).json(vac);
  } catch (error) {
    next(error);
  }
};

// Get all VACs
exports.getVACs = async (req, res, next) => {
  try {
    const vacs = await VAC.find().populate("pet");
    res.status(200).json(vacs);
  } catch (error) {
    next(error);
  }
};

// Get single VAC by ID
exports.getVACById = async (req, res, next) => {
  try {
    const vacId = req.params.id;
    const vac = await VAC.findById(vacId);
    res.status(200).json(vac);
  } catch (error) {
    next(error);
  }
};

// Update VAC
exports.updateVAC = async (req, res, next) => {
  try {
    const vacId = req.params.id;
    const updatedVAC = await VAC.findByIdAndUpdate(vacId, req.body, {
      new: true,
    });
    res.status(200).json(updatedVAC);
  } catch (error) {
    next(error);
  }
};

// Delete VAC
exports.deleteVAC = async (req, res, next) => {
  try {
    const vacId = req.params.id;
    await VAC.findByIdAndDelete(vacId);
    res.status(200).json({ message: "VAC deleted successfully" });
  } catch (error) {
    next(error);
  }
};
