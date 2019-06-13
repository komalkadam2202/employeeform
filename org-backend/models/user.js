const mongoose = require("mongoose");

var user = mongoose.model("loginuser", {
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String },
  password: { type: String }
});

module.exports = { user };
