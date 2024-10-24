const express = require("express");
const router = express.Router();
const petDetailController = require("./petdetails.Controller");

router.post("/", petDetailController.createPetDetail);
router.get("/", petDetailController.getPetDetails);
router.put("/:id", petDetailController.updatePetDetail);
router.delete("/:id", petDetailController.deletePetDetail);
module.exports = router;
