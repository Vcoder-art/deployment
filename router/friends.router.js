const express = require("express");
const friendRouter = express.Router();

const friendsController = require("../controller/friends.controller");

friendRouter.use((req, res, next) => {
  console.log("IP => ", req.ip);
  next();
});

friendRouter.post("/", friendsController.addFriend);

friendRouter.get("/", friendsController.getFriends);

friendRouter.get("/:id", friendsController.getFriendByIndex);

module.exports = friendRouter;
