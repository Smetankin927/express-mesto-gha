const router = require("express").Router();

const usersRoute = require("./users");
const cardsRoute = require("./cards");

router.use("/", usersRoute);
router.use("/", cardsRoute);

router.use("/*", (req, res) => {
  res.status(404).send({ message: "Страница такой нету." });
});

module.exports = router;
