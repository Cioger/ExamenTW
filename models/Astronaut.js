const db = require("../config/db");
const sequelize = require("sequelize");

const Astronaut = db.define("astronaut",{
    name: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
    },
    role: {
      type: sequelize.STRING,
    },
  },
);

module.exports = Astronaut
