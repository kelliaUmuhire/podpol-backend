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
    category: {
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
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tags",
      },
    ],
    s_date: {
      type: Date,
      default: Date.now,
    },
    episodes: [
      {
        name: String,
        description: String,
        location: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  })
);

const validatePodcast = (podcast) => {
  const joiSchema = Joi.object({
    userId: Joi.objectId().required(),
    category: Joi.objectId().required(),
    name: Joi.string().required(),
    p_picture: Joi.string(),
    status: Joi.string(),
    description: Joi.string(),
    s_date: Joi.date(),
    tags: Joi.array(),
    episodes: Joi.array(),
  });

  return joiSchema.validate(podcast);
};

module.exports.PodCast = PodCast;
module.exports.validatePodcast = validatePodcast;
