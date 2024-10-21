const Appointment = require("../../models/Appointment");
const PetDetail = require("../../models/PetDetails");
const Services = require("../../models/Services");

// Create Appointment
exports.createAppointment = async (req, res, next) => {
  try {
    const { date, serviceId, petId, notes } = req.body;

    const pet = await PetDetail.findById(petId);
    const service = await Services.findById(serviceId);

    if (!pet || !service) {
      return res.status(400).json({ message: "Pet or service not found" });
    }

    const appointment = await Appointment.create({
      date,
      service: serviceId,
      pet: petId,
      notes,
    });

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

// Get All Appointments
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().populate("service pet");
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};
