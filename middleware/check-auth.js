const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[2];
    const decode = jwt.verify(token, "secret");
    req.userData = decode;
    //   if () {
    //     console.log(err.name);
    //   }
    console.log(req.userData);
    next();
  } catch (error) {
    console.log("hello");
  }
  // } catch (error) {
  //   try {
  //     const token = req.header.authorization.split(" ");
  //     console.log(token);
  //     const decode = jwt.verify(req.body.token, "secret");
  //     req.userData = decode;
  //     next();
  //}
  //   return res.status(401).json({
  //     message: "Auth Failed "
  //   });
  //}
};
