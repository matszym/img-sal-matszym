'use strict';

let _ = require('underscore'),
searchInterfaceProto = {
  image: () => {
    throw new Error('.image() method not implemented.');
  }
},
flickrProvider = _.extend(Object.create(searchInterfaceProto), require('./flickr-provider.server.controller'));

module.exports = engine => {
  return flickrProvider;
}
