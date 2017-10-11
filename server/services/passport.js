const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

const localOtions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOtions, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
       if (err) {
           return done(err, false);
       }

       if (user) {
           done(null, user);
       } else {
           done(null, false);
       }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);