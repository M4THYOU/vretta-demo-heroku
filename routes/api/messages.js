const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');


// @route POST api/messages/send
// @desc Sends a new message.
// @access Public
router.post('/send', (req, res, next) => {

    const player = req.body.playerId;
    const message = req.body.s_message;
    const gameId = req.body.gameId;
    const fromCoach = req.body.fromCoach;

    Game.findById(gameId)
        .then(game => {

            let currMessages = game.messages.get(player);

            if (typeof currMessages === "undefined") {
                game.messages.set(player, [[message, fromCoach]]);
            } else {
                currMessages.push([message, fromCoach]);
                game.messages.set(player, currMessages);
            }

            if (!fromCoach) {
                game.hasUnread.set(player, true);
            }

            game.markModified('messages');
            game.save();

        });

});

// @route POST api/messages/broadcast
// @desc Broadcasts a new message to all players.
// @access Public
router.post('/broadcast', (req, res, next) => {

    const gameId = req.body.gameId;
    const message = req.body.s_message;
    const fromCoach = true;
    const isBroadcast = true;

    const newMsg = [message, fromCoach, isBroadcast];

    Game.findById(gameId)
        .then(game => {

            let currMessagesJson = game.messages.toJSON();
            Object.keys(currMessagesJson).forEach(key => {

                let currMessages = game.messages.get(key);

                if (typeof currMessages === "undefined") {
                    game.messages.set(key, [newMsg]);
                } else {
                    currMessages.push(newMsg);
                    game.messages.set(key, currMessages);
                }

            });

            game.broadcasts.push(newMsg);

            game.markModified('messages');
            game.markModified('broadcasts');
            game.save();

        });

});

module.exports = router;