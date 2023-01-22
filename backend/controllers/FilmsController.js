const Film = require("../models/films");
const asyncHandler = require("express-async-handler");

class FilmsController {
  add = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Add Controller: Provide all fields");
    }
    const film = await Film.create({ ...req.body });

    if (!film) {
      res.status(400);
      throw new Error("Unable to save into Database");
    }
    return res.status(201).json({
      code: 201,
      message: "Success",
      data: film,
    });
  });

  // FETCH ALL
  fetchAll = asyncHandler(async (req, res) => {
    const films = await Film.find({});
    if (!films) {
      res.status(400);
      throw new Error("Unable to fetch");
    }

    res.status(200).json({
      code: 200,
      message: "Success",
      data: films,
      quantity: films.length,
    });
  });

  fetchOne(req, res) {
    res.send("fetchOne");
  }
  update(req, res) {
    console.log("Body", req.body);
    console.log("Query", req.query);
    console.log("Params", req.params);
  }
  remove(req, res) {
    res.send("remove");
  }
}

module.exports = new FilmsController();
