const express = require("express");
const router = express.Router();
const astronautController = require("../controllers").astronaut;

router.get("/", astronautController.getAll);
router.get("/bySpacecraft/:spacecraftId/:offset/", astronautController.getAstronautBySpacecraft);
router.get("/:id/", astronautController.getAstronaut);
router.post("/", astronautController.addAstronaut);
router.patch("/:id/", astronautController.updateAstronaut);
router.delete("/:id/", astronautController.deleteAstronaut);

module.exports = router;
