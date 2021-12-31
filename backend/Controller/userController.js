const User = require("../Model/user");

const asyncError = require("../Middleware/asyncError");
const ErrorHandler = require("../utils/error");

exports.getAllUsers = asyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    data: { user },
    message: "Get All Users",
  });
});

exports.updateUser = asyncError(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: { user },
    message: "User Updated",
  });
});

exports.deleteUser = asyncError(async (req, res) => {
  const user = await User.findById(req.params.userId);
  await User.findByIdAndDelete(req.params.userId);

  // await Post.deleteMany({ author: user.userName });
  res.status(200).json({
    success: true,
    message: "User Deleted with all his blogs",
  });
});

exports.getParticularUser = asyncError(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User is not Registered", 409));
  }
  res.status(200).json({
    success: true,
    data: { user },
    message: "User Found",
  });
});
