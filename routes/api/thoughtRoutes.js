const router = require('express').Router();
const { getThought, getThoughts, createThought, createReaction, removeReaction } = require("../../controllers/thoughtController")

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getThought);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;