const express = require("express");
const router = express.Router();
const spacecraftController = require("../controllers").spacecraft;

router.get("/", spacecraftController.getAll);
router.get("/:id", spacecraftController.getSpacecraft);
router.get("/getByName", spacecraftController.getSpacecraftByName);
router.post("/", spacecraftController.addSpacecraft);
router.patch("/:id", spacecraftController.updateSpacecraft);
router.delete("/:id", spacecraftController.deleteSpacecraft);

module.exports = router;
