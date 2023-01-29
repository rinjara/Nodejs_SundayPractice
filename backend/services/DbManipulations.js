const filmsModel = require('../models/films');

class DbManipulations {
  getAllFilms = async () => {
    return await filmsModel.find({});
  };

  addFilm = async data => {
    return await filmsModel.create({ ...data });
  };
}

module.exports = new DbManipulations();
