require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { connection } = require("./Connection/connection");
const { userRouter } = require("./Routes/UserRoutes");
const { postRouter } = require("./Routes/PostRoutes");

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Backend</h1>");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is Running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
