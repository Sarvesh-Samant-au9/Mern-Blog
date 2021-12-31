const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../Middleware/asyncError");
const ErrorHandler = require("../utils/error");

// Register Function
exports.register = asyncMiddleware(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Provide the Necessary Fields", 404));
  }
  if (password.length < 10) {
    return next(
      new ErrorHandler("Password should be at least 8 characters long", 404)
    );
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Duplicate User Entry", 409));
  }
  const hashed = await bcrypt.hash(password, 10);
  user = await User.create({
    userName,
    email,
    password: hashed,
  });

  const payload = {
    user: {
      id: user._id,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });

  res.status(201).json({
    success: true,
    data: { token },
    message: "User Registered",
  });
});

// Login Function
exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Provide Necessary Info", 404));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Password or Mail is Wrong"));
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Password or Mail is Wrong"));
  }

  const payload = {
    user: {
      id: user._id,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  res.status(200).json({
    success: true,
    data: { token },
    message: "User Logged In",
  });
});

// User Details
exports.sendUser = asyncMiddleware(async (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      data: { user: req.user },
      message: "User Details Fetched",
    });
  }
});
