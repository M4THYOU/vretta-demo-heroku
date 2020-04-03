const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const PlayerSchema = new Schema({
    _id: {type: String}, // the player's uid.
    socketId: {type: String},

    // {gameId: isActive}
    // games: {type: Map, of: Boolean}, // can be a member of multiple games. But NOT active in all.
    currentGame: {type: String} // the game the Player is currently active in OR null if not active in any.

    /*
    players: {type: [String]},
    messages: {type: Map, of: [[Schema.Types.Mixed]]}, // {player_uid: [messages]} where a message is [String, Bool(isSentByCoach)]
    socketIds: {type: Map, of: String}, // {player_uid: socketId}
    isActive: {type: Map, of: Boolean},
    broadcasts: {type: [[Schema.Types.Mixed]]} // one broadcast is [String, bool(isSentByCoach), true(isBroadcast)]*/
});

const Player = mongoose.model('player', PlayerSchema);
module.exports = Player;
