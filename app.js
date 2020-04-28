require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const shopRoutes = require("./routes/shop");
const adminRoute = require("./routes/admin");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const sanitizeHTML = require("sanitize-html");
const shopController = require("./controller/shop");
const app = express();

const Maintenance = require("./model/underMaintenance");

//passport config
require("./config/passport")(passport);

//multer config
const filePath = path.join("public", "assets");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() * 10 + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const port = process.env.PORT || 3001;

// Setup views

app.set("view engine", "ejs");
app.set("views", "views");

// Setup public files

app.use(express.static(path.join(__dirname, "public")));

//Maintenance Page

app.use(async (req, res, next) => {
  const maintenance = await Maintenance.findOne({ maintenance: "yes" });
  if (maintenance) {
    res.status(502).render("underMaintenance");
  } else {
    next();
  }
});

// req.body

app.use(bodyParser.urlencoded({ extended: false }));

// Handling Multipart File

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("images")
);

// session setup

app.use(
  session({
    secret: "theShopperKing",
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// mongodb

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://taskapp:MishrA6422@cluster0-fivla.mongodb.net/theShopperKing";
mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {})
  .catch((err) => console.log(err));

//Routers
app.use(shopRoutes);
app.use(adminRoute);

app.get("*", shopController.noPage);

app.listen(port, () => {
  console.log("Server is up and running " + port);
});
