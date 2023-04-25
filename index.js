const express = require("express");
const { connection } = require("./db.js");
const { userRouter } = require("./routes/routes.js");

const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("/contacts", (req, res) => {
  res.status(200).send("Contact Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("Contact Page");
});
//protected routes with unique and random token
app.get("/movies", (req, res) => {
  try {
    jwt.verify(req.query.token, "secretkey", (err, decoded) => {
      if (decoded) {
        res.status(200).send({ data: "movie data" });
      } else {
        res.status(404).send({ error: "error in jwt" });
      }
    });
  } catch (err) {
    res.status(404).send({ error: "error encountered" });
  }
});

app.get("/series", (req, res) => {
  if (req.query.tokens.length > 0 && req.query.token === "tag123")
    res.status(200).send("series Page");
  else {
    res.status(401).send("Login required");
  }
});

app.listen(8080, "localhost", async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log("started server");
});
