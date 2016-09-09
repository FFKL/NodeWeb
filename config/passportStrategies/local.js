const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy(
    function(username, password, done) {
        User.findOne({login: username, password: password}, function(err, user) {
            if (!user)
                return done(err, false, {message: 'Неверный логин'});
            if (!user.authenticate(password))
                return done(err, false, {message: 'Неверный пароль'});
            return done(err, user)
        });
    }
);