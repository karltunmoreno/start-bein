const res = require('express/lib/response');
const { Thought } = require('../models');

const thoughtController = {
    //FUNCTIONS AS METHODS GO HERE

    //GET ALL
    getAllThought(req, res) {
        Thought.find({})
            //ADD .POPULATE METHOD TO SEE THE ACTUAL CONTINUES ASSOCIATED WITH THE THOUGHT INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'continues',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE THOUGHT MODEL TOO
            .select('-_v')
            //.SORT() METHOD IN DESCENDING ORDER
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ONE BY ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            //ADD .POPULATE METHOD TO SEE THE ACTUAL CONTINUES ASSOCIATED WITH THE THOUGHT INSTEAD OF ONLY THE OBJECTID
            .populate({
                path: 'continues',
                select: '-_v'
            })
            //ADD .SELECT() METHOD TO EDIT OUT THE RETURN OF THE _VFIELD FOR THE THOUGHT MODEL TOO
            .select('-_v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //CREATE MODEL
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    //UPDATE MODEL
    updateThought({ params, body }, res) {
        //ADD VALIDATOR OPTION SETTING
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //DELETE MODEL
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought note found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = thoughtController;