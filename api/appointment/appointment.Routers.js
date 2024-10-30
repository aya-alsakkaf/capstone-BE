const express = require("express");
const router = express.Router();
const appointmentController = require("./appointment.Controller");
const passport = require("passport");

// Create Appointment
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  appointmentController.createAppointment
);

// Get All Appointments
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  appointmentController.getAppointments
);

// Get single Appointment by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  appointmentController.getAppointmentById
);

// Update Appointment
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  appointmentController.updateAppointment
);

// Delete Appointment
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  appointmentController.deleteAppointment
);

module.exports = router;
