const express = require("express");
const router = express.Router();
const petDetailController = require("./petdetails.Controller");
const passport = require("passport");
const upload = require("../../middleware/multer");

// Create Pet Detail
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  petDetailController.createPetDetail
);

// Get All Pet Details
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  petDetailController.getPetDetails
);

// Get single Pet Detail by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  petDetailController.getPetDetailById
);

// Update Pet Detail
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  petDetailController.updatePetDetail
);

// Delete Pet Detail
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  petDetailController.deletePetDetail
);

router.get("/owner/:ownerId", petDetailController.getPetDetails);

module.exports = router;
