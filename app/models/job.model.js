const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Job = mongoose.model(
  "Job",
  new mongoose.Schema({
    name: String,
    description: String,
    company: String,
    openPositions: Number,
    country: String,
    region: String,
    remote: Boolean,
    status: String,
    type: String,
    industry: String,
    department: String,
    experience: Number,
    skills: String,
    applications: Number
  })
);

module.exports = Job;
