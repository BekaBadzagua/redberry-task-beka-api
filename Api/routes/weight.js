const express = require('express');
const router = express.Router();
const Weights = require('../src/models/Weight');
const validator = require('../src/validationTools');

//  GET
//  /api/weight
router.get('/', function (req, res) {
  Weights.findAll({
    where: {
      userID: req.query.userID,
    },
  })
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.send({ data: result });
    })
    .catch(error => {
      console.log(error);
      res.send(400, { status: '400', message: 'error' });
    });
});

//  POST
//  /api/weight
router.post('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  // Validate Request
  let isValid = true;

  if (!validator(req.body.value, true, false, false, false, true))
    isValid = false;
  if (!validator(req.body.userID, true, false, false, true)) isValid = false;

  if (!isValid)
    res.send(400, {
      status: '400 Bad Request ',
      message: 'Request data is not valid!',
    });
  else {
    Weights.create({
      value: req.body.value,
      userID: req.body.userID,
    }).catch(error => {
      console.log('Error', error);
      res.send(400, {
        status: '400 Bad Request ',
        message: 'Request data is not valid!',
      });
    });

    res.send(200, { status: 200, message: 'data created!' });
  }
});

//  DELETE
//  /api/weight
router.delete('/', function (req, res) {
  // Validate Request
  console.log(req.query.createdAt)
  if (!req.query.createdAt)
    res.send(400, {
      status: '400 Bad Request ',
      message: 'Request data is not valid!',
    });
  else {
    Weights.destroy({
      where: {
        createdAt: req.query.createdAt,
      },
    }).catch(error => {
      console.log('Error', error);
      res.send(400, {
        status: '400 Bad Request ',
        message: 'Request data is not valid!',
      });
    });
    res.send(200, { status: 200, message: 'data deleted!' });
  }
});

module.exports = router;
