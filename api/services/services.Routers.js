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

// Get Single Service by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  servicesController.getServiceById
);

// Update Service
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  servicesController.updateService
);

// Delete Service
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  servicesController.deleteService
);

module.exports = router;
