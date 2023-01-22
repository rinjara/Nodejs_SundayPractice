const { model, Schema } = require("mongoose");
// body: {
// title: String,
// year: Number,
// rating: Number,
// lang: enum
// }

const filmSchema = Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  year: {
    type: Number,
    required: false,
    default: 2000,
  },
  rating: Number,
  lang: { type: String, enum: ["en", "de", "ua"] },
});

module.exports = model("film", filmSchema);
