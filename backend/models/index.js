const mongoose = require('mongoose')
mongoose.Promise = global.Promise; // вообще legacy, но посмотрим ближе к концу проекта, оно вроде не мешает

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model"); // нам действительно нужны эти два файла
db.role = require("./role.model");
db.campaign = require("./campaign.model");

db.ROLES = ["user", "admin", "moderator"]; // задаём роли, всё верно.

module.exports = db;