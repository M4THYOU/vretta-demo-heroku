const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const GameSchema = new Schema({
    _id: {type: String}, // the gameId
    coachId: {type: String},
    coachSocketId: {type: String},
    date: {type: Date, default: Date.now()},

    players: {type: [String]},
    messages: {type: Map, of: [[Schema.Types.Mixed]]}, // {player_uid: [messages]} where a message is [String, Bool(isSentByCoach)]
    socketIds: {type: Map, of: String}, // {player_uid: socketId}
    isActive: {type: Map, of: Boolean},
    hasUnread: {type: Map, of: Boolean},
    broadcasts: {type: [[Schema.Types.Mixed]]} // one broadcast is [String, bool(isSentByCoach), true(isBroadcast)]
});

const Game = mongoose.model('game', GameSchema);
module.exports = Game;
