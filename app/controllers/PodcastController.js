// const config = require("../config/auth.config");
const db = require("../models");
const { Followers } = require("../models/Followers");
const { PodCast, validatePodcast } = db.podcast;

const PodcastController = {
  async newPodcast(req, res) {
    const { error } = validatePodcast(req.body);
    if (error) return res.status(400).send(error);

    PodCast.create({
      userId: req.body.userId,
      category: req.body.category,
      name: req.body.name,
      tags: req.body.tags,
      episodes: req.body.episodes,
    })
      .then(() =>
        res.status(201).send({ success: true, message: "Successfully created" })
      )
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async getAll(req, res) {
    PodCast.find()
      .populate("category", "-__v")
      .populate("tags", "-__v")
      .exec((err, podcasts) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
          return;
        }
        res.status(200).send({
          podcasts,
        });
      });
  },
  async getById(req, res) {
    PodCast.findById(req.params.id)
      .populate("category", "-__v")
      .populate("tags", "-__v")
      .exec((err, podcasts) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
          return;
        }
        res.status(200).send({
          podcasts,
        });
      });
  },
  async getByCategory(req, res) {
    console.log(req.params.catId);
    PodCast.find({ category: req.params.catId })
      .populate("category", "-__v")
      .populate("tags", "-__v")
      .exec((err, podcasts) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
          return;
        }
        res.status(200).send({
          podcasts,
        });
      });
    //   .then((pods) => res.send(pods))
    //   .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async getByTag(req, res) {
    /* temporary */
    PodCast.find()
      .populate("category", "-__v")
      .populate({
        path: "tags",
        match: { name: req.params.name },
      })
      .exec((err, docs) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
          return;
        }
        let podcasts = docs.filter((pd) => pd.tags.length > 0);
        res.status(200).send({
          podcasts,
        });
      });
    // PodCast.find({ _id: req.params.tagId })
    //   .populate("category", "-__v")
    //   .populate("tags", "-__v")
    //   .exec((err, podcasts) => {
    //     if (err) {
    //       res.status(500).send({ success: false, message: err });
    //       return;
    //     }
    //     res.status(200).send({
    //       podcasts,
    //     });
    //   });
    // PodCast.find({tag})
    // .then((podcasts) => res.send(podcasts))
    // .catch((err) => res.status(400).send({ success: false, message: err }));
    // { $regex: ".*" + "ho" + ".*" }
    // Tag.find({ name: req.params.tag }, { _id: 1 })
    //   .then((docs) => {
    //     let ids = docs.map((doc) => doc._id);
    //     PodCast.find({ tag: { $in: ids } })
    //       .then((docs) => res.send(docs))
    //       .catch((err) => res.send(err));
    //   })
    //   .catch((err) => res.send(err));
  },
  async removePodcast(req, res) {
    PodCast.findByIdAndDelete(req.params.id)
      .then(() => res.send({ success: true, message: "Podcast Deleted" }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async search(req, res) {
    PodCast.find({ name: { $regex: ".*" + req.params.term + ".*" } })
      .populate("category", "-__v")
      .populate("tags", "-__v")
      .exec((err, podcasts) => {
        if (err) {
          res.status(500).send({ success: false, message: err });
          return;
        }
        res.status(200).send({
          podcasts,
        });
      });
  },
  async trending(req, res) {
    Followers.aggregate([
      {
        $group: {
          _id: "$podcastId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ])
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ success: false, message: err }));
  },
};

module.exports = PodcastController;
