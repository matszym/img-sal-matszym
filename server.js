'use strict';

let express = require('express'),
app = express(),
config = require('./config/config.js'),
imgCtrl = require('./controllers/img.server.controller.js'),
server;

app.use('/:query', imgCtrl.searchImage);

server = app.listen(config.port);
console.log(`Server is listening on port ${config.port}`);
