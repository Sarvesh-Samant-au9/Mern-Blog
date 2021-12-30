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
  picture: {
    type: String,
    required: [true, "Image is Necessary"],
  },
  category: {
    type: Array,
  },
  createdDate: { type: Date },
  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },
});
module.exports = mongoose.model("blog", blogSchema);
