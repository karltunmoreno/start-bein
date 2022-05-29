//EXAMPLE OF API ROUTER FROM GOOGLEBOOKS
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
