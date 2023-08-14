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
    params: Joi.object({
      userId: Joi.objectId(),
    }).unknown(true),
  }),
  getUserByID
);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  updateUser
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().pattern(
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        ),
      })
      .unknown(true),
  }),
  updateAvatar
);

module.exports = router; // экспортировали роутер
