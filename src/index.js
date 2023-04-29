const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middleware = require("./middlewares");
const route = require("./routes");
const db = require("./database");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(middleware.credentials);
app.use(cors(config));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", route);

module.exports = {
  //Function: Start the web server api here
  start: () => {
    //If database fails to connect, dont start the app, instead display the error
    db.on("error", (err) => {
      console.error(err);
    });
    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`Connected to database ${db.name}`);
        console.log(`App running on port ${PORT}`);
      });
    });
  },
};
