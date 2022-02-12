const Spacecraft = require("../models/Spacecraft");
const Astronaut = require("../models/Astronaut");

const controller = {
  getAll: async (req, res) => {
    try {
      const spacecraft = await Spacecraft.findAll();
      return res.status(200).json({ spacecraft });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getSpacecraft: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const spacecraft = await Spacecraft.findByPk(id);
      if (!spacecraft) {
        return res.sendStatus(404);
      }
      return res.status(200).json(spacecraft);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getSpacecraftByName: async (req, res) => {
    try {
      const spacecrafts = await Spacecraft.findAll( {
        where:{
          name:req.query.name
        }
      });
      if (!spacecrafts) {
        return res.sendStatus(404);
      }
      return res.status(200).json(spacecrafts);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addSpacecraft: async (req, res) => {
    try {
      const { name,speed,mass } = req.body;
      if (!name || !speed || !mass) {
        return res.sendStatus(400);
      }

      const spacecraft = await Spacecraft.create({
        name,speed,mass
      });

      return res
        .status(201)
        .json({ message: "Spacecraft created!", spacecraft });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateSpacecraft: async (req, res) => {
    try {
      const { name,speed,mass } = req.body;
      const id = parseInt(req.params.id);
      let spacecraft = await Spacecraft.findByPk(id);
      if (!spacecraft) {
        return res.sendStatus(404);
      }
      spacecraft.name = name;
      spacecraft.speed = speed;
      spacecraft.mass = mass;
      await spacecraft.save();

      return res
        .status(200)
        .json({ message: "Spacecraft updated!", spacecraft });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteSpacecraft: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const spacecraft = await Spacecraft.findByPk(id);
      if (!spacecraft) {
        return res.sendStatus(404);
      }
      await spacecraft.destroy();
      res.statusCode = 200;
      return res.json({ message: "Spacecraft deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
