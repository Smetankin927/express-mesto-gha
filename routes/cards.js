// routes/cards.js
// это файл маршрутов
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const {
  createCard,
  getCards,
  deleteCardByID,
  setLikeCard,
  delLikeCard,
} = require("../controllers/cards");

router.post(
  "/cards",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string()
          .required()
          .pattern(
            /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
          ),
      })
      .unknown(true),
  }),
  createCard
);
router.get("/cards", getCards);
router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object({
      cardId: Joi.objectId(),
    }).unknown(true),
  }),
  deleteCardByID
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object({
      cardId: Joi.objectId(),
    }).unknown(true),
  }),
  setLikeCard
);

router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object({
      cardId: Joi.objectId(),
    }).unknown(true),
  }),
  delLikeCard
);

module.exports = router; // экспортировали роутер
