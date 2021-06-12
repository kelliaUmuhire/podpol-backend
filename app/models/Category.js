const mongoose = require("mongoose");

const Category = mongoose.model(
  "categories",

  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports.Category = Category;
