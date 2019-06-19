const express = require("express");
var srouter = express.Router();
var { user } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
var nodemailer = require("nodemailer");

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
            console.log("------------", req.body.email);
            const users = new user({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
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
      console.log("ssssssssssss", users);
      if (users.length < 1) {
        res.json({
          message: "Auth failed user not found",
          status: 1
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.json({
            message: "Auth failed",
            auth: "password wrong",
            status: 0
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
          return res.json({
            message: "Auth successful",
            token: token
          });
        } else {
          return res.json({
            message: "Auth failed",
            status: 0
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// srouter.post("/forgot", (req, res, next) => {
//   console.log(req.body.email);
//   user
//     .find({ email: req.body.email })
//     .exec()
//     .then(users => {
//       console.log(users);
//       if (users.length < 1) {
//         return res.status(401).json({
//           message: "email not found"
//         });
//       } else {
//         console.log("transporter");
//         var transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             xoauth2: xoauth2.createXOAuth2Generator({
//               user: config.googleAuth.email,
//               clientId: config.googleAuth.clientID,
//               clientSecret: config.googleAuth.clientSecret,
//               refreshToken: config.googleAuth.refreshToken
//             })
//           }
//         });

//         var mailOptions = {
//           from: "komal22kadam@gmail.com",
//           to: "komal22kadam@gmail.com",
//           subject: "Sending Email using Node.js",
//           text: "That was easy!"
//         };
//         transporter.sendMail(mailOptions, function(error, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("Email sent: " + info.response);
//           }
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

srouter.post("/forgot", (req, res) => {
  user
    .find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth failed user not found"
        });
      } else {
        console.log("gfghf");

        sendMail(users, info => {
          console.log();
          res.send(info);
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
async function sendMail(user, callback) {
  console.log(user);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: "komal22kadam@gmail.com",
      pass: "gszkzdjlrrmfskpr"
    }
  });

  let mailOptions = {
    from: "komal22kadam@gmail.com",
    to: "komal22kadam@gmail.com",
    subject: "welcome to email",
    text:
      "<h1>Click on link to reset password</h1> http://localhost:4200/reset/" +
      user[0]._id +
      ""
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

srouter.post("/resendemail/:id", (req, res) => {
  user
    .find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.json({
          message: "Auth failed user not found"
        });
      } else {
        console.log("gfghf");

        sendMail(users, info => {
          console.log();
          res.send(info);
        });
      }
    })
    .catch(err => {
      res.json({
        error: err
      });
    });
});
async function sendMail(user, callback) {
  console.log(user);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: "komal22kadam@gmail.com",
      pass: "gszkzdjlrrmfskpr"
    }
  });

  let mailOptions = {
    from: "komal22kadam@gmail.com",
    to: "komal22kadam@gmail.com",
    subject: "welcome to email",
    text: "<h1>You successfully reset password</h1>"
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

srouter.put("/reset/:id", (req, res) => {
  console.log("------------", req.params.id);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      var pass = {
        password: hash
      };

      console.log("----------------", pass);
      user.findByIdAndUpdate(
        req.params.id,
        { $set: pass },
        { new: true },
        (err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log("error");
          }
        }
      );
    }
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
