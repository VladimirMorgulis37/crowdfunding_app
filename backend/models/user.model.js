const mongoose = require("mongoose");

const User = mongoose.model( // ВЫ ТОЛЬКО ПРЕДСТАВЬТЕ - КРУД С МОНГУСОМ НЕ ТРЕБУЕТСЯ!!!! ОН ПОДДЕРЖИВАЕТСЯ ИЗНАЧАЛЬНО
  "User",
  new mongoose.Schema({
    username: String,
    email: String, // набор здравого пользователя юзернейм, емейл, пароль и роль в системе
    password: String,
    roles : [
      {
        type: mongoose.Schema.Types.ObjectId, // есть коллекция ролей, мы берем айдишники нужных ролей и перекидываем сюда
        ref: "Role" // отсылочки пошли
      }
    ]
  })
);

module.exports = User;