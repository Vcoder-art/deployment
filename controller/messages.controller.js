const path = require("path");

function getMessage(req, res) {
  // res.sendFile(path.join(__dirname, "..", "public", "images", "image.png"));
  res.render("messages", {
    title: "this is message page",
  });
}

module.exports = {
  getMessage,
};
