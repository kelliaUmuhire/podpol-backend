// const config = require("../config/auth.config");
const db = require("../models");
const { PodCast } = require("../models/PodCast");
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
      .then((categories) => res.send({ categories }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async getById(req, res) {
    Category.findById(req.params.id)
      .then((category) => res.send({ category }))
      .catch((err) => res.status(400).send({ success: false, message: err }));
  },
  async trending(req, res) {
    PodCast.aggregate([{ $sortByCount: "$category" }, { $limit: 10 }])
      .then(async (docs) => {
        let categories = [];
        for (let i = 0; i < docs.length; i++) {
          let category = await Category.findById(docs[i]._id).select("-__v");
          categories.push({ ...category._doc });
        }
        res.status(200).send({ categories });
      })
      .catch((err) => res.status(500).send({ success: false, message: err }));
  },
  async removeCategory(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then(() => res.send({ success: true, message: "Removed" }))
      .catch(res.status(400).send({ success: false, message: err }));
  },
};

module.exports = CategoryController;
