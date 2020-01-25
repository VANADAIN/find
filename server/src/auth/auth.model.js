const db = require(".././db/connection.js");

const users = db.get("users");
users.createIndex("username", { unique: true });

module.exports = users;
