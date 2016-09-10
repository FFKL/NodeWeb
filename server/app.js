const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

require('./models/user.js')(mongoose);
const User = mongoose.model('User');

require('./config/express.js')(app, passport);
require('./config/mongoose.js')(mongoose);
require('./config/passport.js')(passport);

const userController = require('./controllers/userController.js');

var auth = passport.authenticate(
    'local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true
    }
);

var mustBeAuthenticated = function(req, res, next) {
    console.log('isAuth ' + req.isAuthenticated());
    req.isAuthenticated() ? next() : res.redirect('/login');
};

app.get('/', (req, res) => {
    res.redirect('/user');
});
app.post('/login', auth);
app.post('/reg', (req, res) => {
    var item = new User({login: req.body.username, password: req.body.password});
    item.save((err) => {
        if (!err) res.render('index');
    });
});

app.get('/login', userController.login);
app.get('/logout', userController.logout);

app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);

app.get('/user', function(req, res) {
    res.render('index', {user: req.user});
});

const server = app.listen(8080, function() {
    console.log("Server has started");
});

module.exports = server;