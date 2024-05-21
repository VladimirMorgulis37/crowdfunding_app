const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Create new User object
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // Save user to the database
    const savedUser = await user.save();

    // Assign roles
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles }
      });

      if (!roles.length) {
        return res.status(400).send({ message: "Failed! Roles not found!" });
      }

      savedUser.roles = roles.map(role => role._id);
    } else {
      // Default role
      const role = await Role.findOne({ name: "user" });
      savedUser.roles = [role._id];
    }

    // Save updated user with roles
    await savedUser.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
      username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password"
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret, {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};