// const config = require("../config/auth.config");
const db = require("../models");
const { PodCast, validatePodcast } = db.podcast;

const UserController = {
  async newPodcast(req, res) {
    const { error } = validatePodcast(req.body);
    if (error) return res.status(400).send(error);

    PodCast.create({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      name: req.body.name,
      tags: req.body.tags,
      episodes: req.body.episodes,
    })
      .save()
      .then(() =>
        res.status(201).send({ success: true, message: "Successfully created" })
      )
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
};

module.exports = UserController;
