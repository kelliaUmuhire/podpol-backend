const ProfileController = require("../controllers/ProfileController");
const express = require("express");
const router = express.Router();

router.post("/", ProfileController.newProfile);
router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.getProfile);
router.delete("/:id", ProfileController.removeProfile);

module.exports = router;
