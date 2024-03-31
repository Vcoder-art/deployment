const express = require("express");
const helmet = require("helmet")
const app = express();
const friendRouter = require("./router/friends.router");
const messageRouter = require("./router/message.router");
const payment = require("./router/payment.router")
const path = require("path");

app.use(helmet())
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  const start = Date.now();

  next();
  const lamda = Date.now() - start;
  console.log(`method ${req.method} url :${req.baseUrl} ${req.url} ${lamda}ms`);
});

app.use(express.json());
app.use("/site", express.static(path.join(__dirname, "public")));

app.use("/friends", friendRouter);
app.use("/messages", messageRouter);
app.use("/payment",payment);



app.get("/", (req, res) => {
  res.render("main", {
    title: "main page title",
    name: "vishal sahu",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vel dicta error minima non praesentium culpa numquam explicabo voluptatum. Beatae est ducimus quas ad doloribus excepturi rerum amet, aperiam inventore.",
  });
});

app.listen(5000, () => {
  console.log("server is started ...");
});

