// routes/users.js
// это файл маршрутов
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
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
router.get(
  "/users/:userId",
  celebrate({
    body: Joi.object()
      .keys({
        id: Joi.objectId(),
      })
      .unknown(true),
  }),
  getUserByID
);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router; // экспортировали роутер
