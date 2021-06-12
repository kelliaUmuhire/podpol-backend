const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Episode = mongoose.model(
  "episodes",

  new mongoose.Schema({
    podcastId: {
      type: mongoose.Types.ObjectId,
      ref: "podcast",
      required: true,
    },
    name: String,
    description: String,
    number: Number,
    location: String,
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

// const validateEpisode= (user) => {
//   const joiSchema = Joi.object({
//     fullName: Joi.string().min(3).max(50).required(),
//     email: Joi.string().required(),
//     userName: Joi.string().required(),
//     password: Joi.string().min(6).max(40).required(),
//   });

//   return joiSchema.validate(user);
// };

module.exports.Episode = Episode;
// module.exports.validateUser = validateUser;
