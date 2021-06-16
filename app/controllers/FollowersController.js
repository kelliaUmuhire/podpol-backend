const { Followers } = require("../models/Followers");

const FollowersController = {
  async getAll(req, res) {
    Followers.find()
      .populate("podcastId", "-__v")
      //   .populate("userId","-__v","")
      .exec((err, docs) => {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        res.send(docs);
      });
  },
  async addFollower(req, res) {
    Followers.create({
      podcastId: req.body.podcastId,
      userId: req.body.userId,
    })
      .then(() => res.status(201).send({ msg: "Created", success: true }))
      .catch((err) => res.status(500).send({ error: err }));
  },
};

module.exports = FollowersController;
