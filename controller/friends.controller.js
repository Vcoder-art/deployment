const friends = require("../modal/friends.modal");

function addFriend(req, res) {
  if (!req.body.name) {
    res.status(400).json({ error: "bad request" });
    return;
  }

  const friend = {
    name: req.body.name,
    id: friends.length,
  };

  friends.push(friend);

  res.json(friend);
}

function getFriends(req, res) {
  res.json(friends);
}

function getFriendByIndex(req, res) {
  const id = Number(req.params.id);
  const friend = friends[id];

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "not found" });
  }
}

module.exports = {
  addFriend,
  getFriends,
  getFriendByIndex,
};
