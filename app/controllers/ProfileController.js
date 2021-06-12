// const config = require("../config/auth.config");
const db = require("../models");
const { User } = require("../models/User");
const { Profile, validateProfile } = db.profile;

const ProfileController = {
  async newProfile(req, res) {
    const { error } = validateProfile(req.body);
    if (error) return res.status(400).send(error);

    let profileFields = {};
    profileFields.userId = req.body.userId;

    if (req.body.location) profileFields.social.location = req.body.location;
    if (req.body.profileImg)
      profileFields.social.profileImg = req.body.profileImg;
    if (req.body.dob) profileFields.social.dob = req.body.dob;

    //social
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ userId: req.body.userId }).then((profile) => {
      if (profile) {
        //update profile

        Profile.findByIdAndUpdate(
          profile._id,
          { $set: profileFields },
          { new: true }
        )
          .then((updatedProfile) => {
            res.status(200).send({ success: true, message: "Profile Updated" });
          })
          .catch((err) =>
            res.status(400).send({ success: false, message: err })
          );
      } else {
        //new profile
        new Profile(profileFields)
          .save()
          .then((newProfile) =>
            res
              .status(201)
              .send({ success: true, message: "Successfully created" })
          )
          .catch((err) =>
            res.status(400).send({ success: false, message: err })
          );
      }
    });
  },

  async getProfile(req, res) {
    Profile.findById(req.params.id)
      .then((profile) => res.send(profile))
      .catch(res.status(400).send({ success: false, message: err }));
  },

  async getAll(req, res) {
    Profile.find()
      .then((profiles) => res.send(profiles))
      .catch(res.status(400).send({ success: false, message: err }));
  },

  async removeProfile(req, res) {
    Profile.findByIdAndDelete(req.params.id)
      .then((prof) => res.send({ success: true, message: "Profile Deleted" }))
      .catch(res.status(400).send({ success: false, message: err }));
  },
};

module.exports = ProfileController;
