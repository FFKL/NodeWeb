const mongoose = require('mongoose');
const User = mongoose.model('User');
const local = require('./passportStrategies/local.js');

module.exports = function(passport) {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findOne({ _id: id },
        (err, user) => {if (err) done(err); else done(null, user)}));
    passport.use(local);
};