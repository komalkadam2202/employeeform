const express = require("express");
var router = express.Router();
var { Employee } = require("../models/employee");
var ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, "-" + Date.now() + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/send", upload.single("productImage"), (req, res) => {
  console.log(req.file);
  console.log("body ", req.body);
  var path = req.file.path;
  if (req.file.path == "undefined") {
    path = "uploads/-15604102410694.jpeg";
  }
  mobno = req.body.mobno !== "undefined" ? req.body.mobno : "";
  req.body.state = req.body.state !== "undefined" ? req.body.state : "";
  req.body.address = req.body.address !== "undefined" ? req.body.address : "";

  req.body.city = req.body.city !== "undefined" ? req.body.city : "";
  req.body.zip = req.body.zip !== "undefined" ? req.body.zip : "";
  req.body.techskill =
    req.body.techskill !== "undefined" ? req.body.techskill : "";
  req.body.salary = req.body.salary !== "undefined" ? req.body.salary : "";
  req.body.hobbiesPreferences =
    req.body.hobbiesPreferences !== "undefined"
      ? req.body.hobbiesPreferences
      : "";
  req.body.dob = req.body.dob !== "undefined" ? req.body.dob : "";
  req.body.gender = req.body.gender !== "undefined" ? req.body.gender : "";
  var user = new Employee({
    // name: req.body.name
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    mobno: mobno,
    dob: req.body.dob,
    address: req.body.address,
    zip: req.body.zip,
    state: req.body.state,
    city: req.body.city,
    gender: req.body.gender,
    techskill: req.body.techskill,
    salary: req.body.salary,
    hobbiesPreferences: req.body.hobbiesPreferences,
    productImage: path
  });
  console.log(user);
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(err);
    }
  });
});

router.get("/get", (req, res) => {
  Employee.find((err, docs) => { 
    if (!err) {
      res.send(docs);
    } else {
      console.log(error);
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record");
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("error");
    }
  });
});

// router.put("/", upload.single("productImage"), (req, res) => {
//   // console.log("--------------------------", req.body);
//   const data = req.body;
//   console.log(req.body);
//   console.log("----------------------", req.file.path);
//   // if (!ObjectId.isValid(req.params.id))
//   //   return res.status(400).send("no record");

//   var emp = {
//     fname: req.body.fname,
//     lname: req.body.lname,
//     email: req.body.email,
//     mobno: req.body.mobno,
//     dob: req.body.dob,
//     address: req.body.address,
//     zip: req.body.zip,
//     state: req.body.state,
//     city: req.body.city,
//     gender: req.body.gender,
//     techskill: req.body.techskill,
//     salary: req.body.salary,
//     hobbiesPreferences: req.body.hobbiesPreferences,
//     productImage: req.file.path
//   };
//   console.log(emp);

//   Employee.findByIdAndUpdate(
//     req.body.id,
//     { $set: emp },
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.send(doc);
//       } else {
//         console.log("error");
//       }
//     }
//   );
// });
router.put("/:id", upload.single("productImage"), (req, res) => {
  console.log("updated data is");
  console.log(req.body.id);

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record");

  if (req.file) {
    req.body.productImage = req.file.path;
  }
  console.log("--------------------------", req.body);

  var emp = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    mobno: req.body.mobno,
    dob: req.body.dob,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    techskill: req.body.techskill,
    salary: req.body.salary,
    hobbiesPreferences: req.body.hobbiesPreferences,
    productImage: req.body.productImage
  };

  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log("error");
      }
    }
  );
});

// router.put("/:id", upload.single("productImage"), (req, res) => {
//   console.log("updated data is");
//   console.log(req.body.id);

//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send("no record");

//   if (req.file) {
//     console.log("--------------------------", req.body);
//     var emp = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       mobno: req.body.mobno,
//       dob: req.body.dob,
//       address: req.body.address,
//       state: req.body.state,
//       city: req.body.city,
//       zip: req.body.zip,
//       techskill: req.body.techskill,
//       salary: req.body.salary,
//       hobbiesPreferences: req.body.hobbiesPreferences,
//       productImage: req.file.path
//     };

//     Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: emp },
//       { new: true },
//       (err, doc) => {
//         if (!err) {
//           res.send(doc);
//         } else {
//           console.log("error");
//         }
//       }
//     );
//   } else {
//     var emp = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       mobno: req.body.mobno,
//       dob: req.body.dob,
//       address: req.body.address,
//       state: req.body.state,
//       city: req.body.city,
//       zip: req.body.zip,
//       techskill: req.body.techskill,
//       salary: req.body.salary,
//       hobbiesPreferences: req.body.hobbiesPreferences,
//       productImage: req.body.productImage
//     };

//     Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: emp },
//       { new: true },
//       (err, doc) => {
//         if (!err) {
//           res.send(doc);
//         } else {
//           console.log("error");
//         }"
//       }
//     );
//   }
// });

router.delete("/:id", (req, res) => {
  console.log("data is");
  console.log(req.params.id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record");

  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("error");
    }
  });
});

module.exports = router;
