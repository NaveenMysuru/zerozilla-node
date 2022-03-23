const config = require("config");
const jwt = require("jsonwebtoken");
const Agency = require("../models/agency.model");

//------------------------------ Auth ------------------------------//

exports.auth = (req, res, next) => {
  let token;
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) {
    return res.status(401).json({ Message: "No token, authorization denied!" });
  }
  let parts = bearerHeader.split(" ");
  if (parts.length === 2) {
    let scheme = parts[0];
    let credentials = parts[1];
    token = credentials;
  } else {
    return res.status(401).json({ Message: "token format is not valid!" });
  }

  if (!token) {
    return res.status(401).json({ Message: "No token, authorization denied!" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      if (decoded) {
        //id will be set in login api.
        Agency.findOne({ _id: decoded._id }).then((agency) => {
          if (agency && agency.token.toString() == token.toString()) {
            next();
          } else {
            return res.status(401).json({ Message: "token is not valid" });
          }
        });
      }
    } catch (error) {
      return res.status(401).json({ error, Message: "token is not valid" });
    }
  }
};

exports.auth2 = (req, res, next) => {
  next();
};
