const express = require("express");
const router = express.Router();

//new podcast
router.post("/", ProfileController.newProfile);

//get all
router.get("/", ProfileController.getAll);

//update podcast

//update podcast episode

//add new episode

//get by id
router.get("/:id", ProfileController.getById);

//delete
router.delete("/:id", ProfileController.removeProfile);

module.exports = router;
