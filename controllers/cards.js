// controllers/cards.js
// это файл контроллеров

const Card = require("../models/cards");

function createCard(req, res) {
  const { name, link } = req.body;
  console.log("card created");
  //console.log(req);
  Card.create({ name: name, link: link, owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function deleteCardByID(req, res) {
  User.findByIdAndRemove(req.params.cardId)
    .then(() => console.log("карточка удалена"))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function setLikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(() => console.log("лайк поставлен"))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

function delLikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then(() => console.log("лайк удален"))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}

module.exports = {
  createCard,
  getCards,
  deleteCardByID,
  setLikeCard,
  delLikeCard,
};
