const {connect, connection} = require('mongoose');

// Connect to database
connect('mongodb://localhost:27017/Social-Network-API',);

// Export connection
module.exports = connection;