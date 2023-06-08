const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  xAxis: {
    type: Number,
    required: true,
  },
  yAxis: {
    type: Number,
    required: true,
  },
  mapName: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    unique: true,
  },
});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;
