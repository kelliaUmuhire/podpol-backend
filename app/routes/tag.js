const express = require("express");
const TagController = require("../controllers/TagController");
const router = express.Router();

//new tag
router.post("/", TagController.newTag);

//get all
router.get("/", TagController.getAll);

//update tag

//get by id
router.get("/:id", TagController.getById);

//delete
router.delete("/:id", TagController.removeTag);

module.exports = router;
