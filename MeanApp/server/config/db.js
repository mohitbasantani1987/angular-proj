var mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/meanapp11');
module.exports = connection;
