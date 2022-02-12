const express = require("express");
const router = express.Router();
const astronautRouter = require("./Astronaut");
const dbRouter = require("./db");
const spacecraftRouter = require("./Spacecraft");

router.use("/astronaut", astronautRouter);
router.use("/spacecraft", spacecraftRouter);
router.use("/", dbRouter);

module.exports = router;
