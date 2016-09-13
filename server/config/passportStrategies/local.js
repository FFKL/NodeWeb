'use strict';

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const co = require('co');
const crypto = require('crypto-promise');

module.exports = new LocalStrategy( {
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        co(function* () {
            var user = yield User.findOne({login: login}).exec();
            if (!user)
                return done(null, false, { message: 'Incorrect login.' });
            var hash = yield crypto.hash('md5')(password);
            if (hash.toString('hex') !== user.hash)
                return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);

            }
        ).catch(error => console.log(error))
    }
);