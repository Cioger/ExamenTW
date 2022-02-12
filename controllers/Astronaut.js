const Astronaut = require("../models").Astronaut;

const controller = {
  getAll: async (req, res) => {
    try {
      const astronauts = await Astronaut.findAll();
      return res.status(200).json({astronauts});
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getAstronaut: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const astronaut = await Astronaut.findByPk(id);
      if (!astronaut) {
        return res.sendStatus(404);
      }
      return res.status(200).json(astronaut);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getAstronautBySpacecraft: async (req, res) => {
    try {
      const spacecraftId = parseInt(req.params.spacecraftId);
      const offset = parseInt(req.params.offset);
      const astronaut = await Astronaut.findAndCountAll({
        where: {
          spacecraftId: spacecraftId,
        },
        limit: 1,
        offset,
      });
      if (!astronaut) {
        return res.sendStatus(404);
      }
      return res.status(200).json(astronaut);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addAstronaut: async (req, res) => {
    try {
      const { name, role, spacecraftId } = req.body;
      if (!name || !role) {
        return res.sendStatus(400);
      } 
      let astronaut = await Astronaut.create({
        name,
        role,
        spacecraftId
      });

      return res.status(201).json({ message: "Astronaut created!", astronaut });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateAstronaut: async (req, res) => {
    try {
      const { name, role, spacecraftId } = req.body;
      const id = parseInt(req.params.id);
      let astronaut = await Astronaut.findByPk(id);
      if (!astronaut) {
        return res.sendStatus(404);
      }
      astronaut.name = name;
      astronaut.role = role;
      astronaut.spacecraftId = spacecraftId;
      await astronaut.save();
      return res
        .status(200)
        .json({ message: "Astronaut updated!", astronaut });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteAstronaut: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const astronaut = await Astronaut.findByPk(id);
      if (!astronaut) {
        return res.sendStatus(404);
      }
      await astronaut.destroy();
      res.statusCode = 200;
      return res.json({ message: "Astronaut deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
