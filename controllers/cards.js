// controllers/cards.js
// это файл контроллеров

const Card = require("../models/cards");

function createCard(req, res) {
  const { name, link } = req.body;
  console.log("card created");
  //console.log(req);
  Card.create({ name: name, link: link, owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res.status(500).send({ message: "Произошла ошибка сервера" })
    );
}

function deleteCardByID(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найден" });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

function setLikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найден" });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

function delLikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найден" });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка сервера" });
      }
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCardByID,
  setLikeCard,
  delLikeCard,
};
