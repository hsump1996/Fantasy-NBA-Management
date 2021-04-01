// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 1 Team
const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    team:  { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

// NBA team in a user
// * each Team must have a related user
const Team = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    team_name: {type: String, required: true},
    arena_stadium: {type: String, required: true},
    players: [Player],
    founded: {type: Number, required: true}
});

// Player
const Player = new mongoose.Schema({
    name: {type: String, required: true},
    born: {type: Date, required: true},
    nationality: {type: String, required: true},
    position: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

mongoose.model('User', UserSchema);
mongoose.model('Team', ArticleSchema);

