const mongoose = require("mongoose").set('debug', true);

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    userId: String,
    jobId: String,
    status: String,
    username: String,
    matchingScore: String,
    updatedAt: String,
    firstname: String,
    lastname: String,
    message: String,
    profileId: String,
  })
);

module.exports = Application;
