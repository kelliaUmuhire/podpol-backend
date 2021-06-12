const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Tag = mongoose.model(
  "tags",

  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports.Tag = Tag;
