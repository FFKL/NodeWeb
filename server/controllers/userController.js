'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto-promise');
const co = require('co');

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
        co(function* () {
                let login = req.body.login;
                let password = req.body.password;
                if (/ /.test(login) || / /.test(password) || !login || !password)
                    res.render('index', {error: 'Login/password contains spaces or was empty'});
                else {
                    let user = yield User.find({login: login}).exec();
                    if (user.length === 0) {
                        let hash = yield crypto.hash('md5')(password);
                        let newUser = yield new User({
                            login : login,
                            hash : hash.toString('hex')
                        }).save();
                        res.render('index', {message: newUser.login + ' was registered'});
                    } else {
                        res.render('index', {error: login + ' is existing. Enter another Login'});
                    }
                }
            }
        ).catch(error => console.log(error));
    }
};