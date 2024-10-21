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

module.exports = router;
