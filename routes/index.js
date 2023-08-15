const router = require("express").Router();

const {
  NotFoundError, //404
  ServerError, //500
  ValidationError, //400
  WrongLoginPassw, //401
  AccessError, //403
  RegistrationError, // 409
} = require("../errors/errors");

const usersRoute = require("./users");
const cardsRoute = require("./cards");

router.use("/", usersRoute);
router.use("/", cardsRoute);

router.use("/*", (req, res, next) => {
  //res.status(404).send({ message: "Страница такой нету." });
  next(new NotFoundError("Страница такой нету."));
  return;
});

module.exports = router;
