'use strict';
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

require('./models/user')(mongoose);

require('./config/express')(app, passport);
require('./config/mongoose')(mongoose);
require('./config/passport')(passport);
require('./config/routes')(app, passport);

const server = app.listen(8080, () => { console.log("Server has started") });

module.exports = server;