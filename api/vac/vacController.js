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
