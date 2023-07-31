// controllers/users.js
// это файл контроллеров

const User = require("../models/users");

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  console.log("user created");
  console.log(req);
  User.create({ name: name, about: about, avatar: avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

function getUserByID(req, res) {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

function updateUser(req, res) {
  User.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

function updateAvatar(req, res) {
  User.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.name).send({ message: err.message }));
}

module.exports = {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  updateAvatar,
};
