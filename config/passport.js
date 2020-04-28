const bcrypt = require("bcryptjs");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/users");

function getLocalStrategy() {
  return new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (username, password, done) => {
    
    User.findOne({email: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    });
  });
}

function configurePassport() {
  passport.use(getLocalStrategy());
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = configurePassport;