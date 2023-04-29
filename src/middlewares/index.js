const allowedOrigins = require("../allowedOrigin");

module.exports = {
  //This function gives the site the right to have controles(create, read, update, delete) in this api
  credentials: (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", true);
    }
    next();
  },
  authorizedToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }
    //Authheader has 'Bearer (jwtaccesstoken)'
    const accessToken = authHeader.spli(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Missing Access Token" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.UserInfo.username;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Invalid access token" });
    }
  },
};
