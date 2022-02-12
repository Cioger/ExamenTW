const db = require("../config/db");
const sequelize = require("sequelize");
const Astronaut = require("./Astronaut");

const Spacecraft = db.define("spacecraft", {
  name: {
    type: sequelize.STRING,
    allownull: false,
    validate: {
      len: [3, 200]
    }
  },
  speed: {
    type: sequelize.INTEGER,
    allownull: false,
    validate: {
      min: 1000
    }
  },
  mass: {
    type: sequelize.INTEGER,
    allownull: false,
    validate: {
      min: 200
    }
  },
});

Spacecraft.hasMany(Astronaut);
Astronaut.belongsTo(Spacecraft);

module.exports = Spacecraft;
