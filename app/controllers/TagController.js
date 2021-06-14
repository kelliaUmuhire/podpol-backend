// const config = require("../config/auth.config");
const db = require("../models");
const { Tag } = db.tag;

const TagController = {
  async newTag(req, res) {
    if (!req.body.name || req.body.name.length < 2) {
      return res.status(400).send({ message: "Invalid tag name" });
    }

    Tag.findOne({ name: req.body.name }).then((doc) => {
      if (doc) {
        //already exists
        res.status(200).send({ message: "Already exists" });
        return;
      }
      Tag.create({
        name: req.body.name,
      })
        .then(() =>
          res
            .status(201)
            .send({ success: true, message: "Successfully created" })
        )
        .catch((err) => res.status(400).send({ success: false, message: err }));
    });
  },
  async getAll(req, res) {
    Tag.find()
      .then((docs) => res.send({ docs, success: true }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async getById(req, res) {
    Tag.findById(req.params.id)
      .then((doc) => res.send({ doc, success: true }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async removeTag(req, res) {
    Tag.findByIdAndDelete(req.params.id)
      .then(() => res.send({ success: true, message: "Removed" }))
      .catch(res.status(400).send({ success: false, message: err }));
  },
};

module.exports = TagController;
