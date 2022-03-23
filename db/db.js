const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("db"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("Zerozilla mongo DB connected");
  })
  .catch((error) => {
    console.log("DB error", error);
  });

module.exports = mongoose;
