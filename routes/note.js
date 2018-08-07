'use strict';
const express = require('express');
const router = express.Router();

const Note = require('../models/note');

router.post('/', (req, res, next) => {
  const note = {
    title: req.body.title,
    content: req.body.content,
    owner: req.session.currentUser._id
  };
  const newNote = new Note(note);
  newNote.save()
    .then(() => {
      res.json(newNote);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch(next);
});
module.exports = router;
