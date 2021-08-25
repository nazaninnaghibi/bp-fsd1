const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  creator: String,

  createdAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Info', postSchema);