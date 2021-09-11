const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.job = require("./job.model");
db.profile = require("./profile.model");
db.application = require("./application.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;