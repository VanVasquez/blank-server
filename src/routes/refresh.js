const router = require("express").Router();
const controller = require("../controllers");

router.get("refresh", controller.token.Refresh);

module.exports = router;
