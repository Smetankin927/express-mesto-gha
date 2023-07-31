// routes/users.js
// это файл маршрутов
const router = require("express").Router();
const User = require("../models/users");

const {
  createUser,
  getUsers,
  getUserByID,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.post("/users", (req, res) => {
  const { name, about, avatar } = req.body;
  console.log("user created");
  console.log(req);
  User.create({ name: name, about: about, avatar: avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});
router.get("/users", getUsers);
router.get("/users/:userId", getUserByID);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router; // экспортировали роутер
