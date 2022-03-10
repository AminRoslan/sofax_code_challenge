const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
