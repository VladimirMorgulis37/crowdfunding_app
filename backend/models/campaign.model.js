const mongoose = require("mongoose");

const Campaign = mongoose.model(
  "Campaign",
  new mongoose.Schema({
    title: String,
    description: String, 
    cost: String,
  })
);

module.exports = Campaign;