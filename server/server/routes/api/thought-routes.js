//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//IMPORT FUNCTIONALITY VIA CONTROLLER METHODS
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//SET GET AND POST ROUTES TO  /API/THOUGHTS
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//SET GET ONE, PUT, AND DELETE AT /API/THOUGHTS/:ID
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;