const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/',);

// Export connection
module.exports = mongoose.connection;