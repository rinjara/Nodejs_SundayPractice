const { model, Schema } = require("mongoose");

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
});

module.exports = model("user", userSchema);
