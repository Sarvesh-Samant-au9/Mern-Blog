const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const Blog = require("../Model/blog");
const asyncError = require("./asyncError");
const ErrorHandler = require("../utils/error");

// See If user is Authenticated
exports.isAuthenticated = asyncError(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return next(new ErrorHandler("Invalid Login", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
  const user = await User.findById(decode.user.id);
  if (!user) {
    return next(new ErrorHandler("User invalid", 401));
  }
  req.user = user;
  console.log(req.user, 2);
  next();
  console.log(req.user, 29);
});

exports.isOwner = asyncError((req, res, next) => {
  const { userId, blogId } = req.params;
  if (userId) {
    if (!(req.user._id == userId)) {
      return next(new ErrorHandler("Invalid User Request", 401));
    }
  } else if (blogId) {
    if (!Blog.author.equals(req.user._id)) {
      return next(new ErrorHandler("UnAuthorized to Perform Such Action", 401));
    }
  }
});
