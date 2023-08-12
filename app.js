// app.js — входной файл

const express = require("express");
const mongoose = require("mongoose");
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
app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb");
// подключаем мидлвары, роуты и всё остальное...

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post("/signup", createUser);
app.post("/signin", login);
// авторизация
app.use(auth);
//все остальные
app.use("/", indexRoute); // запускаем

//обработка ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(3000, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
