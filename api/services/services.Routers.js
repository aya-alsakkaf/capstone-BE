const express = require("express");
const router = express.Router();
const servicesController = require("./services.Controllers");
const passport = require("passport");

// Create Service
router.post("/", servicesController.createService);

// Get All Services
router.get("/", servicesController.getServices);

// Get Single Service by ID
router.get("/:id", servicesController.getOneService);

// Update Service
router.put("/:id", servicesController.updateService);

// Delete Service
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  servicesController.deleteService
);

module.exports = router;
