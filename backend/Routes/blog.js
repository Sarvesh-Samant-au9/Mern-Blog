const router = require("express").Router();
const {
  getAllBlogs,
  getAllBlogsByUser,
  getParticularBlog,
  deleteBlog,
  updateBlog,
  createBlog,
} = require("../Controller/blogController");
const { isAuthenticated, isOwner } = require("../Middleware/auth");
const multer = require("multer");
const fs = require("fs");

router.get("/", getAllBlogs);

router.get("/:id", getParticularBlog);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

router.post("/", isAuthenticated, upload.single("image"), createBlog);

router.put(
  "/:id",
  isAuthenticated,
  isOwner,
  upload.single("image"),
  updateBlog
);

router.delete("/:id", isAuthenticated, isOwner, deleteBlog);

router.get("/my/:id", getAllBlogsByUser);
module.exports = router;
