'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Notes = require('../models/note');

router.get('/', (req, res, next) => {
  User.find()
    .then((allUser) => {
      return res.status(200).json(allUser);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  // pk vaina req.whatever UWU
  const promises = [
    User.findById(req.params.id),
    Notes.find({owner: req.params.id})
  ];
  Promise.all(promises)
    .then((results) => {
      const data = {
        user: results[0],
        notes: results[1]
      };
      return res.status(200).json(data);
    })
    .catch(next);
});
module.exports = router;
