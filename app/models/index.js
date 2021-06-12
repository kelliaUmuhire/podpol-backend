const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.profile = require("./Profile");
db.category = require("./Category");
db.podcast = require("./PodCast");
db.tag = require("./Tag");

module.exports = db;
