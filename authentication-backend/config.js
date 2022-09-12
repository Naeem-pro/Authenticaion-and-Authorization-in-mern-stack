const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/authentication")
    .then(() => console.log("connected to the database"))
    .catch((error) => console.log(error));
};

module.exports = connection;
