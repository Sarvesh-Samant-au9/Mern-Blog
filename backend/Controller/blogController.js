const asyncError = require("../Middleware/asyncError");
const Blog = require("../Model/blog");

const cloudinary = require("cloudinary").v2;

exports.getAllBlogs = asyncError(async (req, res) => {
  const blogs = await Blog.find().populate("author").sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: {
      blog: blogs,
    },
    message: "All Blogs Loaded",
  });
});

exports.createBlog = asyncError(async (req, res, next) => {
  const cloudinaryLink = await cloudinary.uploader.upload(req.file.path);
  const blog = await Blog.create({
    ...req.body,
    image: cloudinaryLink.url,
    author: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: {
      blog,
    },
    message: "Blog Created",
  });
});

exports.updateBlog = asyncError(async (req, res, next) => {
  let updatedBlog;
  if (req.file) {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(new ErrorHandler("Blog Unavialable", 404));
    }
    const imageName = blog.image.split("/").splice(-1)[0].split(".")[0];
    const newImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: imageName,
      invalidate: true,
    });
    updatedBlog = {
      ...req.body,
      image: newImage.url,
    };
  } else {
    updatedBlog = {
      ...req.body,
    };
  }
  const blogUpdated = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
  });
  res.status(200).json({
    message: "Updated Blog Successfully",
    data: {
      blog: blogUpdated,
    },
    success: true,
  });
});

exports.deleteBlog = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog Unavailable", 404));
  }
  console.log(blog);
  const imageName = blog.image.split("/").slice(-1)[0].split(".")[0];
  await cloudinary.uploader.destroy(imageName);
  blog.delete();
  res.status(200).json({
    success: true,
    message: "Blog Deleted",
  });
});

exports.getParticularBlog = asyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  if (!blog) {
    return next(new ErrorHandler("Blog Not Found", 404));
  }
  res.status(200).json({
    message: "Found the Blog",
    success: true,
    data: {
      blog,
    },
  });
});

exports.getAllBlogsByUser = asyncError(async (req, res, next) => {
  const userBlogs = await Blog.find({ author: req.params.userId })
    .populate("author")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: {
      blogs: userBlogs,
    },
    message: "Blogs by User",
  });
});
