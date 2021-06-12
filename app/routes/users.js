// const { verifySignUp } = require("../middlewares");
const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();

// router.post("/signup", verifySignUp.checkDuplicateEmail, UserController.signUp);
// router.post("/signin", UserController.signIn);

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.delete("/:id", UserController.removeUser);

module.exports = router;
