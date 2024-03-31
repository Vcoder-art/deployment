const express = require("express");
const app = express.Router();

const messageController = require("../controller/messages.controller");

app.use((req, res, next) => {
  console.log("this is myway");
  next();
});

app.get("/", messageController.getMessage);

module.exports = app;
