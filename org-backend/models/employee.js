const mongoose = require("mongoose");

var Employee = mongoose.model("Employee", {
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  mobno: { type: String },
  dob: { type: Date },
  address: { type: String },
  state: { type: String },
  city: { type: String },
  gender: { type: String },
  zip: { type: String },
  techskill: String,
  // techskill: { display: String, value: String },musicPreferences
  salary: { type: String },
  hobbiesPreferences: { type: [String] },
  productImage: { type: String }
});
module.exports = { Employee };
