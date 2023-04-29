const allowedOrigins = require("../allowedOrigin");

//This function blocks the unauthorized websites
//https://www.npmjs.com/package/cors
module.exports = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
};
