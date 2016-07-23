'use strict';

let search = require('./search-interface.server.controller.js');

exports.searchImage = (req, res, next) => {
  search().image(req.params.query)
  .then(result => res.send(result))
  .catch(err => console.log(err));
}
