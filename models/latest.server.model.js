'use strict';

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
latestSchema;

latestSchema = new Schema({
  term: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  }
});

mongoose.model('Latest', latestSchema);