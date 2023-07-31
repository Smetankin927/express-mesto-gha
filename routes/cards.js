// routes/cards.js
// это файл маршрутов
const router = require("express").Router();

const {
  createCard,
  getCards,
  deleteCardByID,
  setLikeCard,
  delLikeCard,
} = require("../controllers/cards");

router.post("/cards", createCard);
router.get("/cards", getCards);
router.delete("/cards/:cardId", deleteCardByID);

router.put("/cards/:cardId/likes", setLikeCard);
router.delete("/cards/:cardId/likes", delLikeCard);

module.exports = router; // экспортировали роутер
