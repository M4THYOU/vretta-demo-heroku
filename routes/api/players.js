const express = require('express');
const router = express.Router();

const Player = require('../../models/Player');

// @route GET api/players
// @desc Get all players.
// @access Public
router.get('/', (req, res, next) => {
    Player.find()
        .then(players => {
            res.json(players);
        });
});

// @route GET api/players/:uid
// @desc Get a specific player by their socket id.
// @access Public
router.get('/:uid', (req, res, next) => {
    Player.findById(req.params.uid)
        .then(player => res.json(player))
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
});

// @route GET api/players/socket/:socketId
// @desc Get a specific player by their socket id.
// @access Public
router.get('/socket/:socketId', (req, res, next) => {
    Player.find({socketId: req.params.socketId})
        .then(player => res.json(player))
        .catch(err => {
        console.log(err);
        res.status(404).json({error: err});
    });
});

// @route POST api/games
// @desc Create a new game.
// @access Public
router.post('/', (req, res, next) => {

    const id = crypto.randomBytes(3).toString('hex');

    const filter = { _id: id };
    const update = {
        date: Date.now(),
        coachId: req.body.coachId,
        players: [],
        messages: {},
        socketIds: {},
        isActive: {}
    };

    Game.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
    }).then(game => {
        console.log('Game successfully added/updated.');
        res.json(game);
    }).catch(err => {
        console.log(err);
        res.status(404).json({error: err});
    });

});

module.exports = router;
