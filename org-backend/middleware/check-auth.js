const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req);
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth is failed"
    });
  }
};
