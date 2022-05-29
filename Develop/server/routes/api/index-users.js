//EXAMPLE FROM BUDGET-TRACKER

const router = require('express').Router();
//IMPORT ALL ROUTES IN THE API FOLDER
const transactionRoutes = require('./transaction-routes');

//ADD PREFIX OF THE <LOWERCASED PLURAL MODELNAME> TO ROUTES AND <LOWERCASED-SINGULAR MODELNAME>ROUTES.JS
router.use('/transactions', transactionRoutes);


module.exports = router;