// app.js — входной файл

const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
const cookies = require("cookie-parser");
//const usersRoute = require("./routes/users"); // импортируем роутер
//const cardsRoute = require("./routes/cards"); // импортируем роутер
const indexRoute = require("./routes/index"); // импортируем роутер

const auth = require("./middlewares/auth");

const bodyParser = require("body-parser");

const { createUser, login } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookies());
app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb");
// подключаем мидлвары, роуты и всё остальное...

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(
          /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        ),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  login
);
// авторизация
//app.use(auth);
//все остальные
app.use("/", auth, indexRoute); // запускаем

//обработка ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  //если у ошибки нет статуса, выставляем 500
  console.log("Ошибка");
  console.log(err.statusCode);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере22 произошла ошибка" : message,
  });
});

app.listen(3000, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
