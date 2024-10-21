const Services = require("../../models/Services");

// Create Service
exports.createService = async (req, res, next) => {
  try {
    const { serviceType, phone, name, details } = req.body;

    const newService = await Services.create({
      serviceType,
      phone,
      name,
      details,
    });

    res.status(201).json(newService);
  } catch (err) {
    next(err);
  }
};

// Get All Services
exports.getServices = async (req, res, next) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};
