const express = require("express");
var srouter = express.Router();
var { state } = require("../models/state");

srouter.post("/sendcity", (req, res) => {
  console.log("body ", req.body);
  var user = new state({
    state: req.body.state
  });
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(err);
    }
  });
});

srouter.get("/getcity", (req, res) => {
  state.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(error);
    }
  });
});

module.exports = srouter;
