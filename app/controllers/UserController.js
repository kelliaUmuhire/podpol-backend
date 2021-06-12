// const config = require("../config/auth.config");
const db = require("../models");
const { User, validateUser } = db.user;
const { Profile, validateProfile } = db.profile;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const ProfileController = require("./ProfileController");

const UserController = {
  async signUp(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);

    User.findOne({ email: req.body.email })
      .then(async (extUser) => {
        if (extUser) {
          res.status(401).send({ message: "User already exists" });
          return;
        }
        const user = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          userName: req.body.userName,
        });
        await user
          .save()
          .then((newUser) => {
            req.body = {};
            req.body.userId = String(newUser._id);
            ProfileController.newProfile(req, res);
            // return re
            //   .status(201)
            //   .send({ message: "User was registered successfully!" });
          })
          .catch((err) => {
            return res.status(500).send({ message: err });
          });
      })
      .catch((err) => res.status(500).send({ message: err }));
  },

  async signIn(req, res) {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
          expiresIn: 86400, // 24 hours
        });
        console.log(token);

        //get profile

        res.status(200).send({
          id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
        return;
      });
  },

  async removeUser() {},
};

module.exports = UserController;
