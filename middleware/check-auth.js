const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[2];
    console.log(token);
    const decode = jwt.verify(token, "secret");
    req.userData = decode;
    next();
  } catch {
    return res.status(401).json({
      message: "Auth Failed "
    });
  }
};
