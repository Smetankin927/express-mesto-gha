const router = require("express").Router();

const usersRoute = require("./users");
const cardsRoute = require("./cards");

router.use("/", usersRoute);
router.use("/", cardsRoute);

module.exports = router;
