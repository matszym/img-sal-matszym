'use strict';

let search = require('./search-interface.server.controller.js'),
mongoose = require('mongoose'),
Promise = require('bluebird');

require('../models/latest.server.model.js');

let Latest = mongoose.model('Latest');

mongoose.Promise = Promise;

exports.searchImage = (req, res, next) => {
  search().image({
    text: req.params.query,
    offset: req.query.offset
  })
  .then(result => {
    req.searchResult = result;
    next();
  })
  .catch(err => res.send(err));
}

exports.saveSearch = (req, res, next) => {
  Latest.create({
    when: Date.now(),
    term: req.params.query
  })
  .then(doc => {
    next();
  })
  .catch(err => res.send(err));
}

exports.getSearch = (req, res) => res.send(req.searchResult);

exports.getLatest = (req, res) => {
  Latest.find({})
  .limit(10)
  .sort('-when')
  .then(docs => {
    let response = docs.map(doc => {
      return {
        term: doc.term,
        when: doc.when
      };
    })
    res.send(response);
  })
  .catch(err => {
    res.send(err);
  })
}