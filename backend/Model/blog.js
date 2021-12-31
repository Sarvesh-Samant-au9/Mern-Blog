const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Cannot Be Empty"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Content Must be Present"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is Necessary"],
  },
  category: {
    type: String,
    required: [true, "Choose any of 1 category"],
  },
  tags: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },
});
module.exports = mongoose.model("blog", blogSchema);
