const express = require('express');
const router = express.Router();

// const Game = require('../../models/Game');

// @route GET api/aws/connect/player
// @desc Get all games.
// @access Public
router.get('/connect/player', (req, res, next) => {
    /*
    Game.find()
        // .sort({date: -1}) // descending // sorting is done on client side.
        .then(games => {
            console.log(games);
            console.log(res);
            res.json(games);
        });*/

    res.json(req.request_id);

    /*
    const uid = data.userId;
    const gameId = data.gameId;

    client.join(gameId);

    // add it to db as socketIds = [uid: client.id]
    console.log('storing player:', uid, 'from:', gameId);
    console.log('socketId:', client.id);

    Game.findByIdAndUpdate(gameId, { $addToSet: { players: uid } }, {new: true}, (err, game) => {
        if (err) {
            console.log(err);
        } else {
            // the user list may be updated, so send it to the coach.
            const target = game.coachSocketId;
            client.to(target).emit('newPlayerList', {playerList: game.players});

            // update the player's socketId
            game.socketIds.set(uid, client.id);
            console.log('New player socketId:', client.id);

            // check if user has a field in messages. If not, add one.
            if (typeof game.messages === "undefined") {
                game.messages = {};
                game.messages.set(uid, []);
            } else if (typeof game.messages.get(uid) === "undefined") {
                game.messages.set(uid, []);
            }

            game.isActive.set(uid, true);
            // emit to coach that player._id has connect.
            client.to(game.coachSocketId).emit('playerChangeConnection', { playerId: uid, isActive: true });

            game.save();

        }
    });

    const filter = { _id: uid };
    const update = {
        socketId: client.id,
        currentGame: gameId,
    };
    Player.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
    }).then(player => {
        console.log('Player successfully added/updated.');
    }).catch(err => {
        console.log(err);
    });*/

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
