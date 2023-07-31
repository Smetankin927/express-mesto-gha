// app.js — входной файл

const express = require("express");
const mongoose = require("mongoose");
const routeIndex = require("./routes/index"); // импортируем роутер
const bodyParser = require("body-parser");

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
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use("/", routeIndex); // запускаем

app.listen(3000, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
