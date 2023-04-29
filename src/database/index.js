const mongoose = require("mongoose");

const URI = process.env.MONGO_DB_URI || "";

//This function refresh's itself it connection throws an error
const connectWithRetry = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.error("MongoDB connection unsuccessful, reconnecting...", err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

module.exports = mongoose.connection;
