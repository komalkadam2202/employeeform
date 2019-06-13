const express = require("express");
var srouter = express.Router();
var { user } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

// srouter.post("/register", (req, res) => {
//   console.log("body ", req.body);
//   user
//     .find({ username: req.body.username })
//     .exec()
//     .then(users => {
//       if (users.length >= 1) {
//         return res.status(409).json({
//           message: "username already exist"
//         });
//         console.log("body ");
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             console.log("no");
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             var users = new user({
//               _id: new mongoose.Types.ObjectId(),
//               username: req.body.username,
//               password: hash
//             });
//             users
//               .save()
//               .then(result => {
//                 res.status(201).json({
//                   message: "user created"
//                 });
//               })
//               .catch();
//           }
//         });
//       }
//     });
// });
srouter.post("/register", (req, res, next) => {
  user
    .find({ username: req.body.username })
    .exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "user exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const users = new user({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            users
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

srouter.post("/login", (req, res, next) => {
  user
    .find({ username: req.body.username })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth failed user not found"
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: users[0].username,
              userId: users[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

srouter.delete("/:userId", checkAuth, (req, res) => {
  user
    .remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "user deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = srouter;
