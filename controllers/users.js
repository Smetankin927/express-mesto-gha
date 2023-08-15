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
const { errors } = require("celebrate");

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
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      })
    ) //fixme? if !user?????
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      if (err.code === 11000) {
        next(
          new RegistrationError("Пользователь с такими данными уже существует")
        );
        return;
      }
      next(err);
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
}

function getUserByID(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }

      res.send(user);
      return;
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      next(err);
    });
}

function getUserMe(req, res) {
  //после авторизации у нас req.user есть
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch((err) => {
      console.log("getid 2");
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      next(err);
    });
}

function updateUser(req, res, next) {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
}

function updateAvatar(req, res, next) {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  if (!req.body) {
    throw new ValidationError("Переданы некорректные данные");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError("Переданы некорректные данные");
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      //создадим токен
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      //записываем в куки
      res.cookie("jwt", token);
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      throw new WrongLoginPassw("ошибка аутентификации");
    })
    .catch((err) => {
      next(err);
    });
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
