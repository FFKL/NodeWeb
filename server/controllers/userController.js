'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/user');
        } else {
            if (req.session.flash)
                res.render('index', {error: req.session.flash.error});
            else
                res.render('index');
        }
    },
    logout(req, res) {
        req.logout();
        res.redirect('/');
    },
    register(req, res) {
        let login = req.body.login;
        let password = req.body.password;
        let space = / /;
        if (space.test(login) || space.test(password) || !login || !password)
            res.render('index', {error: 'Login/password contains spaces or was empty'});
        else {
            let promise = User.find({login: login}).exec();
            promise
                .then((user) => {
                    if (user.length === 0) {
                        let newUser = new User({login: login, password: req.body.password});
                        return newUser.save();
                    } else {
                        return login;
                    }
                })
                .then((result) => {
                    if (result._id)
                        res.render('index', {message: result.login + ' was registered'});
                    else
                        res.render('index', {error: result + ' is existing. Enter another Login'});
                })
                .catch(error => console.log(error));
        }
    }
};