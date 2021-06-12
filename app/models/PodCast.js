const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const PodCast = mongoose.model(
  "podcast",

  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    p_picture: String,
    status: String,
    description: String,
    tags: [],
    dos: {
      type: Date,
      default: Date.now,
    },
    episodes: {},
  })
);

const validateUser = (user) => {
  const joiSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(40).required(),
  });

  return joiSchema.validate(users);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
