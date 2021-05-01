
require('./db');
require('./auth');

const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const path = require('path');
const app = express();

const higherOrderFunction = require("./function.js");

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
const { compareFunction } = require('./function.js');
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

//Get for Adding Teams
app.get('/addTeam', (req, res) => {

  res.render('team-add');

});


//Post for Adding Teams
app.post('/addTeam', (req, res) => {

  const playersList = [];
  
  const team = new TeamSchema({user: req.user['_id'], team_name: req.body.team_name, arena_stadium: req.body.arena_stadium, playersList, founded: req.body.founded});

  function compareFunction(array) {
    
    if (array.length > 0) {

      return true;

    } else {
      return false;
    }
  }

  TeamSchema.find({user: req.user['_id']}, function(err, teams){
    if (higherOrderFunction.isBiggerThanOne(teams, compareFunction)){

      res.render('error');

    } else {
      team.save(err => {
        //Case where there's an error and re-renders the article-add.hbs
          if (err) {
              console.log(err);          
          //Case where the team saved successfully and redirected to the main page
          } else {
                res.redirect('/');
          }
      });  
    }
  });
});


// come up with a url for /team/slug-name!
app.get('/team/:slug', (req, res) => {

  //Gets the value of query string parameters
  const slug = req.params.slug;

  TeamSchema.find({slug: slug}).populate('user').exec((err, team) => {

      if (err) {
          console.log(err);
      
      } else {
        console.log(team);
        res.render('team-detail', {'team': team});
      }
  });

});

app.get('/my-team', (req, res) => {

  TeamSchema.find({user: req.user['_id']}, function(err, team, count) {
    
    if (err) {
      console.log(err);
      
    } else {
        res.render('my-team', {'team': team});
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


app.get('/my-team', (req, res) => {

  TeamSchema.find({user: req.user['_id']}, function(err, team, count) {
    
    if (err) {
      console.log(err);
      
    } else {
        res.render('my-team', {'team': team});
    }
  });
});





app.get('/my-team/roster', (req, res) => {

  PlayerSchema.find({user: req.user['_id']}, (err, players) => {

    if (err) {
        console.log(err);
    
    } else {

      const height = players.map(e => e.height);

      //Converts height to inch
      for (let i = 0; i < height.length; i++) {

        height[i]= height[i] / 2.54;

      };

      //Converts weight to lbs
      const weight = players.map(e => e.weight);

      for (let i = 0; i < weight.length; i++) {

        weight[i]= weight[i] * 2.20462;
        
      };
      res.render('roster', {'player': players, 'height': height, 'weight': weight});
    }
  });
});



app.get('/my-team/roster/add', (req, res) => {

    res.render('player-add');

});


app.post('/my-team/roster/add', (req, res) => {

      //Create a new Player
    const player = new PlayerSchema({name: req.body.name, born: req.body.born, nationality: req.body.nationality, position: req.body.position, height: req.body.height, 
    weight: req.body.weight, team_name: req.body.team_name, user: req.user['_id']});

    player.save(err => {
        
        if (err) {
            console.log(err);          
      
            //Case where the player saved successfully and redirected to the roster page
        } else {
          const players = [];
          players.push(player);

          const update = { players: players};
          
          TeamSchema.findOneAndUpdate({'team_name': req.body.team_name}, update, function(err, team){
            if (err) {
              console.log(err);
            } else {
              console.log(team);
              res.redirect('/my-team/roster');
            }
          });
        }  
    })
});




app.listen(process.env.PORT || 3000);