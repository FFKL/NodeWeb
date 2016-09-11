'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/user');
        } else {
            if (req.session.flash)
                res.render('index', {message: req.session.flash.error});
            else
                res.render('index');
        }
    },
    logout(req, res) {
        req.logout();
        res.redirect('/');
    },
    register(req, res) {
        let login = req.body.username;
        User.find({login: login}, (err, user) => {
            if (user.length === 0) {
                let newUser = new User({login: login, password: req.body.password});
                newUser.save((err) => {
                    if (!err) {
                        res.render('index', {message: login + ' was registered'});
                    }
                });
            } else {
                res.render('index', {message: login + ' is existing. Enter another Login'});
            }
        });
    }
};