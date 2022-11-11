const { Thought, User } = require("../models")

function getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function getThoughts(req,res) {
    Thought.find()
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function createThought(req,res) {
    Thought.create(req.body)
    .then((data)=> {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: data._id }},
            { new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought 🎉')
      );
    })
    .catch((err) => {
        console.log(err)
    })
}

function createReaction(req,res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { new: true }
    )
    .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(Thought)
      )
    .catch((err) => {
        console.log(err)
    });
};

function removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that ID :(' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  };


module.exports = {
    getThought,
    getThoughts,
    createThought,
    createReaction,
    removeReaction
}