// controllers/users.js
// это файл контроллеров

const User = require("../models/users");

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  //console.log("user created");
  //console.log(req);
  User.create({ name: name, about: about, avatar: avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

function getUserByID(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.status(500).send({ message: "Произошла ошибка сервера" });
    });
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
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
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
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  updateAvatar,
};
