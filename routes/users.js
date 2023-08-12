// routes/users.js
// это файл маршрутов
const router = require("express").Router();

const {
  //createUser,
  getUsers,
  getUserByID,
  getUserMe,
  updateUser,
  updateAvatar,
  //login,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getUserMe); //FIXME
router.get("/users/:userId", getUserByID);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router; // экспортировали роутер
