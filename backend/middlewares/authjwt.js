const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId)
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        return Role.find({
          _id: { $in: user.roles }
        }).exec();
      })
      .then(roles => {
        if (!roles) {
          throw new Error("Roles not found");
        }
  
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            return next();
          }
        }
        return res.status(403).send({ message: "Require Admin Role!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Internal server error" });
      });
  };
  
  const isModerator = (req, res, next) => {
    User.findById(req.userId)
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        return Role.find({
          _id: { $in: user.roles }
        }).exec();
      })
      .then(roles => {
        if (!roles) {
          throw new Error("Roles not found");
        }
  
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            return next();
          }
        }
        return res.status(403).send({ message: "Require Moderator Role!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Internal server error" });
      });
  };
  
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt // подташнивает, а вдруг это вообще не заработает? это смерть будет