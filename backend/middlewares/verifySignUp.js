const db = require("../models"); // интересный факт мы требуем ИНДЕКС.ЖС таким образом
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Check for required fields
    if (!req.body.username || !req.body.email) {
      res.status(400).send({ message: "Username and email are required!" });
      return;
    }
  
    // Check for duplicate username
    User.findOne({ username: req.body.username }).exec()
      .then(user => {
        if (user) {
          res.status(400).send({ message: "Failed! Username is already in use!" });
          return Promise.reject('UsernameExists'); // Indicate the reason for rejection
        }
  
        // Check for duplicate email
        return User.findOne({ email: req.body.email }).exec();
      })
      .then(user => {
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return Promise.reject('EmailExists'); // Indicate the reason for rejection
        }
  
        next(); // Proceed to the next middleware
      })
      .catch(err => {
        // Handle only unexpected errors here
        if (err !== 'UsernameExists' && err !== 'EmailExists') {
          res.status(500).send({ message: "An error occurred while checking for duplicates." });
        }
      });
  };

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
}; // в этом надо разобраться.. меня уже подташнивает

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp // умно сделали - 2 проверочки запихнули в одну и экспортнули..