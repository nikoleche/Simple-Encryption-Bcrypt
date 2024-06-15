const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
require("./models/User");

const { homeController } = require("./controllers/home");
const {
  loginGET,
  loginPOST,
  logoutGET,
  registerGET,
  registerPOST,
  details,
} = require("./controllers/auth");

async function start() {
  await mongoose.connect("mongodb://localhost:27017/testdb");

  const app = express();

  app.engine("hbs", handlebars.create({ extname: "hbs" }).engine);
  app.set("view engine", "hbs");
  app.use(
    session({
      secret: "secret",
      saveUninitialized: true,
      resave: true,
      cookie: { secure: false },
    })
  );

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", homeController);
  app.get("/register", registerGET);
  app.post("/register", registerPOST);
  app.get("/login", loginGET);
  app.post("/login", loginPOST);
  app.get("/logout", logoutGET);
  app.get("/details", details);

  app.listen(3000, () => console.log("Server started successfully"));
}

start();
