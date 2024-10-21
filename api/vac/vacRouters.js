const express = require("express");
const router = express.Router();
const vacController = require("../vac/vacController");

router.post("/", vacController.createVAC);
router.get("/", vacController.getVACs);

module.exports = router;
