const Astronaut = require("./Astronaut");
const Spacecraft = require("./Spacecraft");

Spacecraft.hasMany(Astronaut);
Astronaut.belongsTo(Spacecraft);

module.exports = {
  Astronaut: Astronaut,
  Spacecraft: Spacecraft,
};
