const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  top: {
    type: Number,
    default: 0,
  },
  left: {
    type: Number,
    default: 0,
  },
  shape: {
    type: String,
    default: "octagon",
  },
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
