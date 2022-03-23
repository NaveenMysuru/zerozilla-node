const express = require("express");
const bodyParser = require("body-parser");

const ClientRoute = require("../routers/client.router");

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(express.json());

const mongoose = require("../db/db");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port: ${PORT}`));

app.use("/client", ClientRoute);

module.exports = app;
