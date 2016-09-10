const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy(
    (username, password, done) => {
        User.findOne({login: username, password: password}, (err, user) => {
            if (!user)
                return done(err, false, {message: 'Invalid login or password'});
            if (!user.authenticate(password))
                return done(err, false, {message: 'Invalid password'});
            return done(err, user)
        });
    }
);