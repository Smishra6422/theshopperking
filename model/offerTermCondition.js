const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  website: {
    type: String,
    trim: true,
    required: true,
  },
  offerTermCondition: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("offer", offerSchema);
