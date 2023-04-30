const router = require('express').Router();

const authRoute = require('./auth');
const refreshRoute = require('./refresh');
const todoRoute = require('./todo');
const userRoute = require('./user');
const authorizedToken = require('../middlewares').authorizedToken;

router.use('/auth', authRoute);
router.use('/token', refreshRoute);
router.use(authorizedToken);
router.use('/todo', todoRoute);
router.use('/user', userRoute);

module.exports = router;
