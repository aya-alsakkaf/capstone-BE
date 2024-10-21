const express = require("express");
const router = express.Router();
const servicesController = require("./services.Controllers");
const passport = require("passport");

// Create Service
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  servicesController.createService
);

// Get All Services
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  servicesController.getServices
);

module.exports = router;
