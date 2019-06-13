const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/EmpDB",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("mongodb connected successfully");
    } else {
      console.log("mongodb connect:" + JSON.stringify(err, undefined, 2));
    }
  }
);
module.exports = mongoose;
