const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: { type: String  },
    avatar: { type: String  },
  })
);

module.exports = User;
