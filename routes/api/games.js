const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const Game = require('../../models/Game');

// @route GET api/games
// @desc Get all games.
// @access Public
router.get('/', (req, res, next) => {
    Game.find()
        // .sort({date: -1}) // descending // sorting is done on client side.
        .then(games => {
            console.log(games);
            console.log(res);
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
            res.json(games);
        });
});

// @route GET api/games/:id
// @desc Get a specific game.
// @access Public
router.get('/:id', (req, res, next) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
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
        isActive: {},
        hasUnread: {},
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

// @route POST api/games/unread/:id
// @desc Updates
// @access Public
router.post('/unread/:id', (req, res, next) => {

    console.log('\n\n\n\n\nHELLO\n\n\n\n');
    console.log('TEST');
    const update = {};
    console.log("AAA");
    const playerId = req.body.playerId;
    console.log("BBB");
    const unreadValue = req.body.unread;

    console.log('a');
    console.log(req.params.id);
    console.log('b');

    Game.findByIdAndUpdate(req.params.id, update, {new: true}, (err, game) => {
        if (err) {
            console.log(err);
        } else {
            game.hasUnread.set(playerId, unreadValue);
            game.save();
        }
    });

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
