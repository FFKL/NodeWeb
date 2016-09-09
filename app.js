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
        failureRedirect: '/login'
    }
);

app.get('/', auth);
app.post('/login', auth);
app.post('/reg', function(req, res) {
    console.log(req.body.username);
    var item = new User({login: req.body.username, password: req.body.password});
    item.save(function(err){
        if (!err) res.render('index');
    });
});

app.get('/login', userController.login);
app.get('/logout', userController.logout);

app.listen(8080);
console.log("Server has started");