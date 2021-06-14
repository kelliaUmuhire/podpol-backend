// const config = require("../config/auth.config");
const db = require("../models");
const { Category } = db.category;

const CategoryController = {
  async newCategory(req, res) {
    if (!req.body.name || req.body.name.length < 2) {
      return res.status(400).send({ message: "Invalid category name" });
    }

    Category.findOne({ name: req.body.name }).then((doc) => {
      if (doc) {
        //already exists
        res.status(200).send({ message: "Already exists" });
        return;
      }
      Category.create({
        name: req.body.name,
      })
        .save()
        .then(() =>
          res
            .status(201)
            .send({ success: true, message: "Successfully created" })
        )
        .catch((err) => res.status(400).send({ success: false, message: err }));
    });
  },
  async getAll(req, res) {
    Category.find()
      .then((docs) => res.send({ docs, success: true }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async getById(req, res) {
    Category.findById(req.params.id)
      .then((doc) => res.send({ doc, success: true }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async removeCategory(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then(() => res.send({ success: true, message: "Removed" }))
      .catch(res.status(400).send({ success: false, message: err }));
  },
};

module.exports = CategoryController;
