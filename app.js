const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

//MongoConnect
const { mongoConnect } = require("./Database/mongoDb");

//Model

const User = require("./models/user");

//Setting view
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routers/admin");
const shopRoute = require("./routers/shop");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61b5c17a8002de782d57b30e")
    .then((user) => {
      let { name, email, cart, _id } = user;
      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch((err) => {
      console.log(err);
      // res.redirect("/");
    });
});

app.use("/admin", adminRoute.router);

app.use(shopRoute);

app.use((req, res) => {
  //res.status(404).sendFile(path.join(__dirname, './views/page-not-found.html'));
  res
    .status(404)
    .render("page-not-found", { pageTitle: " Page Not Found", path: "/" });
});

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("server started listening to port 3000");
  });
});
