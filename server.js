'use strict';

let express = require('express'),
app = express(),
mongoose = require('mongoose'),
config = require('./config/config.js'),
imgCtrl = require('./controllers/img.server.controller.js'),
server,
db;

db = mongoose.connect(config.mongo);

app.use('/api/imagesearch/:query', imgCtrl.searchImage, imgCtrl.saveSearch, imgCtrl.getSearch);
app.use('/api/latest/imagesearch', imgCtrl.getLatest);

server = app.listen(config.port);
console.log(`Server is listening on port ${config.port}`);
