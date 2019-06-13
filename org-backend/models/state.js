const mongoose = require("mongoose");

var State = mongoose.model("State", {
  state: { type: String },
  city: { type: String }
});

module.exports = { State };
