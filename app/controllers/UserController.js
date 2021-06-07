// const config = require("../config/auth.config");
const db = require("../models");
const { User, validateUser } = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const UserController = {
  async signUp(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      userRole: req.body.userRole,
    });
    await user
      .save()
      .then(() => {
        return res
          .status(201)
          .send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
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

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

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
};

module.exports = UserController;
