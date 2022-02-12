const astronautController = require("./Astronaut");
const spacecraftController = require("./Spacecraft");
const dbController = require("./db");

const controllers = {
  astronaut: astronautController,
  db: dbController,
  spacecraft: spacecraftController,
};

module.exports = controllers;
