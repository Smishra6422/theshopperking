const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminLoginSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("adminLogin", adminLoginSchema);
