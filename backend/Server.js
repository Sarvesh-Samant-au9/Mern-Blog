const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const onError = require("./Middleware/errorMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/user", require("./Routes/user"));
app.use("/api/blog", require("./Routes/blog"));

const PORT = process.env.PORT || 5000;

const url = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(url).then((e) => console.log("Connected To Mongo"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(onError);
app.listen(PORT, () => {
  connectDB();
  console.log("PORT STARTED", process.env.PORT);
});