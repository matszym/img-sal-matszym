'use strict';

let flickrapi = require('flickrapi'),
config = require('../config/config'),
Promise = require('bluebird'),
flickrOptions = {
  api_key: config.flickrAPI,
  secret_key: config.flickrSecret
};

exports.image = query => {
  let flickr = Promise.promisify(flickrapi.tokenOnly);

  return flickr(flickrOptions)
  .then(flickr => {
    let search = Promise.promisify(flickr.photos.search);

    return search({
      text: query.text,
      page: query.offset || 1,
      per_page: 10
    });
  })
  .then(result => {
    let response = result.photos.photo.map(photo => {
      return {
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        snipet: photo.title,
        thumbnail: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`
      }
    });

    return response;
  })
  .catch(err => console.log(err));
}
