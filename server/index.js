const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB with", process.env.DB_CONNECT)
);

//MIDDLEWARE
app.use(express.json());

//ROUTE MIDDLEWARES
app.use("/user", authRoute);
app.use("/posts", postRoute);
//app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
  console.log("Backend test running");
  res.send(JSON.stringify(`Hello Nadav!`));
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Express server is running on port ${port}...`)
);
