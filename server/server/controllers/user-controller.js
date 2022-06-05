const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    //FUNCTIONS AS METHODS GO HERE

    //GET ALL
    getAllUser(req, res) {
        User.find({})
            //ADD .POPULATE METHOD TO SEE THE ACTUAL FRIENDSS ASSOCIATED WITH THE USER INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'friends',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE USER MODEL TOO
            .select('-_v')
            //.SORT() METHOD IN DESCENDING ORDER
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ONE BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            //ADD .POPULATE METHOD TO SEE THE ACTUAL FRIENDS ASSOCIATED WITH THE User INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'friends',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE USER MODEL TOO
            .select('-_v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //CREATE MODEL
    //POST NEW USER
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //UPDATE MODEL
    updateUser({ params, body }, res) {
        //ADD VALIDATOR OPTION SETTING
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE MODEL
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // //ADD FRIEND TO USER TUTOR DEMO-NOT FINISHED NOT WORKING
    // addFriend({ params, body }, res) {
    //     User.findOneAndUpdate({ _id: body.userId }, { $addToSet: { friends: params.friendId } }, { new: true })
    //         .then((userData) => {
    //             if (!userData) {
    //                 return res.status(404).json({ message: 'There is a no user with this id' })
    //             }
    //             res.json()
    //         })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No user found with this id!' });
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));
    // },

    //ADDFRIEND TO USER-CLC INTERPOLATION FROM PIZZAHUNT
    // addFriend({ params }, res) {
    //     User.findOneAndUpdate(
    //         { _id: params.userId },
    //         { $addToSet: { friends: params.friendId } },
    //         { new: true }
    //     )
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No user found with this id!' });
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));
    // },

    //ADD FRIEND ONLINE TUTOR CODY'S CODE 
    // addFriend({ params }, res) {
    //     User.findOneAndUpdate(
    //         { _id: params.userId },
    //         { $addToSet: { friends: params.friendId } },
    //         { new: true }
    //     )
    //         .then(data => {
    //             if (!data) {
    //                 res.status(404).json({ message: 'No friend with this id!' });
    //                 return;
    //             }

    //             User.findOneAndUpdate(
    //                 { _id: params.friendId },
    //                 { $addToSet: { friends: params.userId } },
    //                 { new: true }
    //             )

    //                 .then(data => {
    //                     if (!data) {
    //                         res.status(404).json({ message: 'No friend with this id!' });
    //                     }
    //                     res.json(data);
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     res.status(500).json(err);

    //                 })
    //         }
    //         )
    // },

    //ADDFRIEND TO USER-CLC INTERPOLATION FROM PIZZAHUNT FIXED BY TA TIM FOR ROUTE USING URL PARAMS AND JSON BODY
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: body.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //REMOVEFRIEND FROM USER- VIA URL PARAMS ONLY - NO BODY REQUIRED
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;