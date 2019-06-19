const mongoose = require("mongoose");

var user = mongoose.model("loginuser", {
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String },
  username: { type: String },
  password: { type: String }
});

module.exports = { user };
