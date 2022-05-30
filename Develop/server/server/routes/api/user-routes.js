//SET-UP FOR EXPRESS.JS
const router = require('express').Router();

//IMPORT FUNCTIONALITY VIA CONTROLLER METHODS
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//SET GET AND POST ROUTES TO  /API/USERS
router
    .route('/')
    .get(getAllUser)
    .post(createUser);


//SET GET ONE, PUT, AND DELETE AT /API/USERS/:USERID
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// //SET A PUT UPDATE TO USER TO ADD A FRIEND AT API/USERS/:USERID/FRIENDS
// router
//     .route('/:id/friends/')
//     .put(addFriend);

// //SET POST to ADD and DELETE TO USER TO REMOVE A FRIEND BYFRIENDID AT API/USERS/:USERID/FRIENDS/:FRIENDID
// router
//     .route('/:id/friends/:friendId')
//     .delete(removeFriend);

//SET A POST ROUTE TO /API/FRIENDS/:USERID VIA THE ADDFRIEND() METHOD
router
    .route('/:userId/friends')
    .put(addFriend);

//USE A DELETE CALLBACK VIA REMOVEFRIEND() METHOD SET-UP AS THE ROUTE /API/FRIENDS/:USERID/:FRIENDID 
router
    .route('/:userId/friends/:friendId')
    // .post(addFriend)
    .delete(removeFriend);

module.exports = router;