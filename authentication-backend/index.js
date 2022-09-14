const express = require("express");
const connection = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connection(); //function to connect to the database

const app = express();
app.listen(4000, () => console.log("server is running on port 4000"));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

/******* Routes *******/
const userroutes = require("./routes/userRoutes");
app.use("/api", userroutes);
