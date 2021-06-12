const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const User = mongoose.model(
  "users",

  new mongoose.Schema({
    fullName: String,
    userName: String,
    email: String,
    password: String,
  })
);

const validateUser = (user) => {
  const joiSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().min(6).max(40).required(),
  });

  return joiSchema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
