const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoose } = require("./db.js");
const mongoos = require("mongoose");

var employeeController = require("./controllers/employeeController");
var userController = require("./controllers/userController");

const port = 3500;
var app = express();
mongoos.set("debug", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:4200" }));
app.use("/uploads", express.static("uploads"));
app.use("", employeeController);
app.use("", userController);
app.listen(port, function() {
  console.log("start");
});
