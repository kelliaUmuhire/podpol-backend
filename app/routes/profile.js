const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);

module.exports = router;
