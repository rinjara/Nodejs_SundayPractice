// console.log("Hello from server");
require("colors");
const dotenv = require("dotenv");
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });
const express = require("express");
const errorHandler = require("../backend/middlewares/errorHandler");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.static("public"));

// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("../backend/routes/filmsRoutes"));

// express-handlebars
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.post("/send", (req, res) => {
//   res.send(req.body);
// });
const sendEmail = require("./services/sendEmail");

app.post("/send", async (req, res) => {
  try {
    await sendEmail(req.body);

    res.render("send", {
      msg: "Email send successfully",
      userName: req.body.userName,
      userEmail: req.body.userEmail,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
  //   next();
});
app.use(errorHandler);

const connectDb = require("../config/db");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port: ${process.env.PORT}`.bold.blue);
});
