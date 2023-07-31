// models/user.js

const mongoose = require("mongoose");
// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  avatar: {
    type: String,
    required: true
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("user", userSchema);
