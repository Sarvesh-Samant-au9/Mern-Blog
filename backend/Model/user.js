const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "UserName Cannot Be Empty"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email Address is Necessary"],
    unique: [true, "Email already exists"],
    select: false,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required "],
    select: false,
  },
  userPic: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
