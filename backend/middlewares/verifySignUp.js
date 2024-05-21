const db = require("../models"); // интересный факт мы требуем ИНДЕКС.ЖС таким образом
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({username: req.body.username}).exec()
        .then(user => {
            if (user){
                res.status(400).send({message: "Failed! Username is already in use!"});
                return Promise.reject();
            }
            
            return User.FindOne({email: req.body.email}).exec();
        })
        .then(user => {
            if (user){
                res.status(400).send({message: "Failed! Email is already in use!"});
                return;
            }
            
            next();
        })
        .catch(err => {
            if (err) {
                res.status(500).send({ message: "ошибка" });
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