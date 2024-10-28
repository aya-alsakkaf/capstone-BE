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

const Service = require("../../models/Service");

// Get single Service by ID
exports.getOneService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findOne({
      _id: serviceId,
      owner: req.user._id,
    }).populate("relatedField"); // Replace "relatedField" with actual fields if needed

    if (!service) {
      return res.status(404).json({
        message: "Service not found or you're not authorized to view it",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// Delete Service by ID
exports.deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findOneAndDelete({
      _id: serviceId,
      owner: req.user._id,
    });

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found or you're not authorized to delete it",
      });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update Service
exports.updateService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};
