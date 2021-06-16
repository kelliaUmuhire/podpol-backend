const express = require("express");
const FollowersController = require("../controllers/FollowersController");
const router = express.Router();

//new category
router.post("/", FollowersController.addFollower);

//get all
router.get("/", FollowersController.getAll);

// //update category

// //get by id
// router.get("/:id", CategoryController.getById);

// //delete
// router.delete("/:id", CategoryController.removeCategory);

module.exports = router;
