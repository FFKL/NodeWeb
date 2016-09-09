const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const templates = require('consolidate');

module.exports = function(app, passport) {
    app.engine('hbs', templates.handlebars);
    app.set('view engine', 'hbs');
    app.set('views', './views');


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({secret: 'SECRET'}));

    app.use(passport.initialize());
    app.use(passport.session());
};