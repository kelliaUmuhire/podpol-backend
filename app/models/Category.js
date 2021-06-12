const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
