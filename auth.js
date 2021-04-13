//Letting passport know what strategy I want to use and ways to serialize/deserialize a user
const mongoose = require('mongoose'),

passport = require('passport'),

LocalStrategy = require('passport-local').Strategy,

User = mongoose.model('User');