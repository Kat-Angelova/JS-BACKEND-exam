const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = require('../constants.js');

module.exports = function initDatabase() {
    return mongoose.connect(DB_CONNECTION_STRING);
};
