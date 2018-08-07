'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
