'use strict';
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

require('./models/user')(mongoose);

require('./config/express')(app, passport);
require('./config/mongoose')(mongoose);
require('./config/passport')(passport);
require('./config/routes')(app, passport);

const server = app.listen(port, () => { console.log("Server has started on localhost:" + port) });

module.exports = server;