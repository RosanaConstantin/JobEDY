// const config = require("../config/auth.config");
const db = require("../models");
const Profile = db.profile;
const User = db.user;

exports.profileInfo = async (req, res) => {
  const id = req.params.id;
  Profile.findById(id, function (err, profile) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!profile) {
      res.status(200).send(null);
      return;
    }
    res.status(200).send(profile);
    return;
  });
};

exports.saveProfile = async (req, res) => {
  const profile = new Profile({ ...req.body });
  profile.save(async (err, profile) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const user = await User.findOneAndUpdate({
      username: req.body.username
    }, { profileId: profile._id });
    res.status(200).send(profile);
  }
  );
};

exports.updateProfile = async (req, res) => {
  const id = req.params.id;
  const profile = req.body;
  Profile.update({ _id: id }, { $set: profile }, (err, profile) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // const user = await User.findOneAndUpdate({
    //   username: req.body.username
    // }, { profileId: profile._id });
    res.status(200).send(profile);
  }
  );
};
