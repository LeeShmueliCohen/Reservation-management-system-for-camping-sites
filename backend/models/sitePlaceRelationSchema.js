const mongoose = require("mongoose");

const relationSchema = new mongoose.Schema({
  placeId: {
    type: String,
    ref: "Place",
    required: true,
  },
  siteId: {
    type: String,
    ref: "Site",
    required: true,
  },
});

const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;
