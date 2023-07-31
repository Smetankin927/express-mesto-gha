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

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserByID);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router; // экспортировали роутер
