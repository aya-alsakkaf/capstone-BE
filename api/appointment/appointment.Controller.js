const Appointment = require("../../models/Appointment");
const PetDetail = require("../../models/PetDetails");
const Services = require("../../models/Services");

// Create Appointment
exports.createAppointment = async (req, res, next) => {
  try {
    const { date, time, serviceId, petId, notes } = req.body;

    const pet = await PetDetail.findById(petId);
    const service = await Services.findById(serviceId);

    if (!pet || !service) {
      console.log("first");
      return res.status(404).json({ message: "Pet or service not found" });
    }

    const appointment = await Appointment.create({
      date: new Date(date.slice(0, 10)),
      time,
      service: serviceId,
      pet: petId,
      notes,
    });

    service.Appts.push(appointment._id);
    await service.save();
    pet.Appts.push(appointment._id);
    await pet.save();

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

// Get single Appointment by ID
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

// Update Appointment
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

// Delete Appointment
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
