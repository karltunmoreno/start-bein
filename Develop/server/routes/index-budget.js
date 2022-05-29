//THIS MAIN ROUTER EXAMPLE IS FROM BUDGET-TRACKER - NO REACT LOGIC

const router = require('express').Router();
//IMPORT API/INDEX.JS
const apiRoutes = require('./api');
// const htmlRoutes = require('./html/html-routes');

//ADD PREFIX OF `/API` TO ALL API ROUTES IMPORTED FROM THE API DIRECTORY
router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;