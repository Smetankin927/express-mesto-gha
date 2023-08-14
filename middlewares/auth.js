// middlewares/auth.js
const {
  WrongLoginPassw, //401
} = require("../errors/errors");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
    console.log("here1");
  } catch (err) {
    console.log("we auth");
    //return res.status(401).send({ message: "Необходима авторизация" });
    next(new WrongLoginPassw("Необходима авторизация"));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
