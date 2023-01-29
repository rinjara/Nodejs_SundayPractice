const { model, Schema } = require('mongoose');

const userSchema = Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
  userMessage: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
});

module.exports = model('user', userSchema);
