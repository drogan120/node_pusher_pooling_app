const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotENV = require("dotenv");
dotENV.config();

const app = express();
const poll = require("./app/routes/poll");
//  Set public folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());

app.use("/poll", poll);

const port = process.env.APP_PORT || 3000;
const url = process.env.APP_URL || "127.0.0.1";
app.listen(port, () => {
  console.log(`Server running on  http://${url}:${port}`);
});
