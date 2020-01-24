
const monk = require('monk');

const db = monk('localhost/find');

module.exports = db;
