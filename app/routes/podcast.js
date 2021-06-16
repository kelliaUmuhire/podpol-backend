const express = require("express");
const router = express.Router();
const PodcastController = require("../controllers/PodcastController");

//new podcast
router.post("/", PodcastController.newPodcast);

//get all
router.get("/", PodcastController.getAll);

//get by id
router.get("/:id", PodcastController.getById);

//get by category
router.get("/category/:catId", PodcastController.getByCategory);

//get by tag
router.get("/tag/:name", PodcastController.getByTag);

//search
router.get("/search/:term", PodcastController.search);

//trending podcasts
router.get("/trending", PodcastController.trending);

// //update podcast

// //update podcast episode

// //add new episode

// //get by id
// router.get("/:id", ProfileController.getById);

//delete
router.delete("/:id", PodcastController.removePodcast);

module.exports = router;
