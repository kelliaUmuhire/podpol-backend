const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Profile = mongoose.model(
  "profiles",

  new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    location: String,
    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
    },
    profileImg: String,
    dob: Date,
  })
);

const validateProfile = (profile) => {
  const joiSchema = Joi.object({
    user: Joi.objectId().required(),
    location: Joi.string(),
    social: Joi.object({
      youtube: Joi.string(),
      twitter: Joi.string(),
      facebook: Joi.string(),
      linkedin: Joi.string(),
      instagram: Joi.string(),
    }),
    profileImg: Joi.string(),
    dob: Joi.date(),
  });

  return joiSchema.validate(profile);
};

module.exports.Profile = Profile;
module.exports.validateProfile = validateProfile;
