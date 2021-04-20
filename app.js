
require('./db');
require('./auth');

const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
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


// enable sessions
const session = require('express-session');
const bodyParser = require('body-parser');
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session(sessionOptions));


passport.use(new LocalStrategy(UserSchema.authenticate()));
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

//Starts passpoort
app.use(passport.initialize());

//Enables persistent login sessions
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());


// body parser setup
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


//req.user will be in the context of every template
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


app.get('/addTeam', (req, res) => {

  res.render('team-add');

});


app.post('/addTeam', (req, res) => {

  const playersList = [];
  
  
  const team = new TeamSchema({user: req.user['_id'], team_name: req.body.team_name, arena_stadium: req.body.arena_stadium, playersList, founded: req.body.founded});

  team.save(err => {
      
    //Case where there's an error and re-renders the article-add.hbs
      if (err) {
          console.log(err);          
      //Case where the team saved successfully and redirected to the main page
      } else {
            res.redirect('/');
      }
  });  
});



app.get('/login', function(req, res) {
  res.render('login');
});


app.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});


app.get('/register', function(req, res) {
  
  res.render('register');

});

app.post('/register', function(req, res) {
  UserSchema.register(new UserSchema({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your registration information is not valid'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
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