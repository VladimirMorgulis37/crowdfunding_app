exports.allAccess = (req, res) => {
    res.status(200).send("Уровень доступа: публичный.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Уровень доступа: пользовательский.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Уровень доступа: администраторский.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Уровень доступа: модераторский.");
};

// прикольно