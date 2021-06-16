const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

//new category
router.post("/", CategoryController.newCategory);

//get all
router.get("/", CategoryController.getAll);

//update category

//get by id
router.get("/byid/:id", CategoryController.getById);

//get hot genres(categories)
router.get("/trending", CategoryController.trending);

//delete
router.delete("/:id", CategoryController.removeCategory);

module.exports = router;
