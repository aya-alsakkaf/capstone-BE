const express = require("express");
const router = express.Router();
const vacController = require("../vac/vacController");

router.post("/", vacController.createVAC);
router.get("/", vacController.getVACs);
router.get("/:id", vacController.getVACById);
router.put("/:id", vacController.updateVAC);
router.delete("/:id", vacController.deleteVAC);

module.exports = router;
