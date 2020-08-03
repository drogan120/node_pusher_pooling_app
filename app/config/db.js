const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

// Map global promise
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.log("Mongodb Connected on :" + process.env.MONGODB_CONNECT);
  })
  .catch((err) => {
    console.log(err);
  });
