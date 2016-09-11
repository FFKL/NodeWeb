const userController = require('../controllers/userController');
const mustBeAuthenticated = require('../config/middlewares/mustBeAuth');

module.exports = (app, passport) => {

    app.get('/', (req, res) => { res.redirect('/user')});
    app.post('/login', passport.authenticate(
        'local', {
            successRedirect: '/user',
            failureRedirect: '/login',
            failureFlash: true
        }
    ));

    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.post('/reg', userController.register);

    app.all('/user', mustBeAuthenticated);
    app.all('/user/*', mustBeAuthenticated);

    app.get('/user', (req, res) => { res.render('index', {user: req.user}) });
};