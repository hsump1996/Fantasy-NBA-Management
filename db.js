// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 1 Team
const UserSchema = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    team:  { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

// NBA team in a user
// * each Team must have a related user
const TeamSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    team_name: {type: String, required: true},
    arena_stadium: {type: String, required: true},
    players: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    founded: {type: Number, required: true}
});

// Player
const PlayerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    born: {type: Date, required: true},
    nationality: {type: String, required: true},
    position: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true}
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;

if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 
    // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/sh4023';

}

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Team', TeamSchema);
mongoose.model('Player', PlayerSchema);


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);


mongoose.connect(dbconf);