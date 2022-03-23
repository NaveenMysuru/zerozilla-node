const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user-management/user.model");
const Customers = require("../models/customers.model");
const Provider = require("../models/provider.model");
const Agent= require("../models/agent.model")
//------------------------------ Auth ------------------------------//

exports.agentAuth = (req, res, next) => {
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
    //   if (/^Bearer$/i.test(scheme)) {

    //   }
  } else {
    return res.status(401).json({ Message: "token format is not valid!" });
  }
  // console.log('token log',token);
  if (!token) {
    return res.status(401).json({ Message: "No token, authorization denied!" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));

      if (decoded) {
       
        Agent.findOne({ _id: decoded._id }).then((agent) => {
          if (agent) {
            if (agent.token.toString() == token.toString()) {
              next();
            } else {
              return res
                .status(400)
                .json({ Message: "token is not valid" });
            }
          } else {
            return res
              .status(400)
              .json({ Message: "token is not valid" });
          }
        });
      }
    } catch (e) {
      return res.status(400).json({ Message: "token is not valid" });
    }
  }
};
