const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile",
  new mongoose.Schema({
    name: String,
    prename: String,
    birthDate: String,
    region: String,
    country: String,
    email: String,
    username:String,
    phone: String,
    gender: String,
    type: String,
    education: String,
    recruiterProfile: Boolean,
    gdprCheck: Boolean,
    skills: String,
    job: String,
    department: String,
    industry: String,
    experience: Number
  })
);

module.exports = Profile;
