'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find()
    .then((allUser) => {
      return res.status(200).json(allUser);
    })
    .catch(next);
});

module.exports = router;
