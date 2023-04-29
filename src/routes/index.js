const router = require("express").Router();

const authRoute = require("./auth");
const refreshRoute = require("./refresh");
const authorizedToken = require("../middlewares").authorizedToken;

router.use("/auth", authRoute);

router.use(authorizedToken);
router.use("/", refreshRoute);

module.exports = router;
