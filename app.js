
require('./db');
require('./auth');

const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Schema
const UserSchema = mongoose.model('User');
const PlayerSchema = mongoose.model('Player');
const TeamSchema = mongoose.model('Team');

app.use(bodyParser.urlencoded({ extended: false }));

//Starts passpoort
app.use(passport.initialize());

//Enables persistent login sessions
app.use(passport.session());

passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};

app.use(session(sessionOptions));


// body parser setup
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


//req.user will be in the contex of every template
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});


//Home Page
app.get('/', (req, res) => {
  
  TeamSchema.find({}, (err, team) => {

    if (err) {
        console.log(err);
    
    } else {
        res.render('index', {'team': team});
    }
  });

});


app.get('/team/roster', (req, res) => {

  PlayerSchema.find({}, (err, player) => {

    if (err) {
        console.log(err);
    
    } else {
        res.render('roster', {'player': player});
    }
  });
});


app.get('/team/roster/add', (req, res) => {

    res.render('player-add');

});


app.post('/team/roster/add', (req, res) => {

      //Create a new Article and associate it with a user
    const player = new PlayerSchema({name: req.body.name, born: req.body.born, nationality: req.body.nationality, position: req.body.position, height: req.body.height, 
    weight: req.body.weight});

    player.save(err => {
        
      //Case where there's an error and re-renders the article-add.hbs
        if (err) {
            console.log(err);          
        //Case where the player saved successfully and redirected to the roster page
        } else {
              res.redirect('/team/roster');
        }
    });  
});




app.listen(process.env.PORT || 3000);