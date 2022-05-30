//IMPORT EXPRESS AND CONTROLLER FUNCTIONALITY
const router = require('express').Router();
const {
    addContinue,
    removeContinue,
    addReaction,
    removeReaction
} = require('../../controllers/continue-controller');

//SET A POST ROUTE TO /API/CONTINUES/:THOUGHTID VIA THE ADDCONTINUE() METHOD
router.route('/:thoughtId').post(addContinue);

//USE A DELETE CALLBACK VIA REMOVECONTINUE() METHOD SET-UP AS THE ROUTE /API/CONTINUES/:THOUGHTID/:CONTINUEID  ---> ADD Reaction UPDATING FUNCTIONALITY
router
    .route('/:thoughtId/:continueId')
    .put(addReaction)
    .delete(removeContinue);

//DELETE ROUTE FOR Reaction
router
    .route('/:thoughtId/:continueId/:reactionId')
    .delete(removeReaction);

//EXPORT THIS ROUTER
module.exports = router;