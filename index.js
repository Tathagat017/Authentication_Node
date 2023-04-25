const express = require("express");
const { connection } = require("./db.js");
const { userRouter } = require("./routes/routes.js");
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.listen(8080, "localhost", async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log("started server");
});
