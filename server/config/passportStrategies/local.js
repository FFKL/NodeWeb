const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy( {
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        User.findOne({login: login, password: password}, (err, user) => {
            if (!user)
                return done(err, false, {error: 'Invalid login or password'});
            return done(err, user)
        });
    }
);