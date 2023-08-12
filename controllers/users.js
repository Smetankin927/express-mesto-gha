// controllers/users.js
// это файл контроллеров

const User = require("../models/users");
const bcrypt = require("bcryptjs"); // hash
const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken

const {
  NotFoundError, //404
  ServerError, //500
  ValidationError, //400
  WrongLoginPassw, //401
  AccessError, //403
  RegistrationError, // 409
} = require("../errors/errors");

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  //
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name: name,
        about: about,
        avatar: avatar,
        email: email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      })
    ) //fixme? if !user?????
    .catch((err) => {
      if (err.name === "ValidationError") {
        //res.status(400).send({ message: "Переданы некорректные данные" });
        throw new ValidationError("Переданы некорректные данные");
      }
      if (err.code === 11000) {
        throw new RegistrationError(
          "Пользователь с такими данными уже существует"
        );
      }
    })
    .catch((err) => {
      next(err);
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
}

function getUserByID(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        //return res.status(404).send({ message: "Пользователь не найден" });
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        //return res.status(400).send({ message: "Переданы некорректные данные" });
        throw new ValidationError("Переданы некорректные данные");
      }
      if (err.name === "DocumentNotFoundError") {
        //return res.status(404).send({ message: "Пользователь не найден" });
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
}

function getUserMe(req, res) {
  //после авторизации у нас req.user есть
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        //return res.status(404).send({ message: "Пользователь не найден" });
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        //return res.status(400).send({ message: "Переданы некорректные данные" });
        throw new ValidationError("Переданы некорректные данные");
      }
      if (err.name === "DocumentNotFoundError") {
        //return res.status(404).send({ message: "Пользователь не найден" });
        throw new NotFoundError("Пользователь не найден");
      }
    })
    .catch(next);
}

function updateUser(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        //res.status(400).send({ message: "Переданы некорректные данные" });
        throw new ValidationError("Переданы некорректные данные");
      }
    })
    .catch(next);
}

function updateAvatar(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        //res.status(400).send({ message: "Переданы некорректные данные" });
        throw new ValidationError("Переданы некорректные данные");
      }
    })
    .catch(next);
}

function login(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    //fixme здесь или в create?
    //res.status(400), json({ message: err.message });
    //console.log("here");
    throw new ValidationError("Переданы некорректные данные");
  }

  const { email, password } = req.body;

  //console.log("here2");
  if (!email || !password) {
    //fixme здесь или в create?
    //res.status(400), json({ message: "нет пароля или почты" });
    //console.log("here2222");
    throw new ValidationError("Переданы некорректные данные");
  }
  console.log("here-1");

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      //создадим токен
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      }); // FIXME key
      // вернём токен
      //console.log("here0");
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      //res.status(401).send({ message: err.message });
      //console.log("here3");
      throw new WrongLoginPassw("ошибка аутентификации");
    })
    .catch((err) => {
      //console.log("here4");
      next(err);
    }); // FIXME вопросы
}

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  getUserMe,
  updateUser,
  updateAvatar,
  login,
};
