const mongoose = require("mongoose");

const Followers = mongoose.model(
  "followers",

  new mongoose.Schema({
    podcastId: {
      type: mongoose.Types.ObjectId,
      ref: "podcast",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  })
);

module.exports.Followers = Followers;
