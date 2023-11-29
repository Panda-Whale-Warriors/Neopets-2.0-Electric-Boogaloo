const express = require("express");
const path = require("path");
const createRouter = require("./routes/createRouter");
const userRouter = require("./routes/userRouter");
const petPageRouter = require("./routes/petPageRouter");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// handle parsing request body
app.use(express.json()); // parses body EXCEPT html
app.use(express.urlencoded({ extended: true })); // parses html

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// handle static serve
// app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
// app.use("/assets", express.static(path.join(__dirname, "../client/assets")));
// serve log-in.html on /

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// serve index.html on the route for /create
app.get("/create", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// handle api router
app.use("/users", userRouter);
app.use("/create", createRouter);
// app.use('/petPage', petPageRouter);

// handle all route handler error for reqs (404)
app.use("*", (req, res) => res.status(404).send("this is not the right page"));

// global error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen for port & connect mongoose db
app.listen(3000, async () => {
  console.log("Server started listening on port: 3000");
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to Mongo DB.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
