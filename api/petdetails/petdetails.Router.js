const express = require("express");
const router = express.Router();
const petDetailController = require("./petdetails.Controller");
const passport = require("passport");
const upload = require("../../middleware/multer");
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  petDetailController.createPetDetail
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  petDetailController.getPetDetails
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  petDetailController.updatePetDetail
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  petDetailController.deletePetDetail
);
module.exports = router;

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  petDetailController.getPetDetailById
);
