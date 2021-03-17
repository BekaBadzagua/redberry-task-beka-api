const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Users = require('../src/models/User');
const validator = require('../src/validationTools');
const bcrypt = require('bcrypt');

//  POST Sign in.
//  /api/auth/signin
router.post('/signin', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Users.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.send({
              status: 400,
              message: err,
            });
          } else {
            if (result) {
              jwt.sign({ user }, 'QHhpZGlvCg==', (err, token) => {
                res.send(200, { token, userId: user.id });
              });
            } else {
              return res.send({
                status: 401,
                message: 'Wrong credentials!',
              });
            }
          }
        });
      } else {
        res.send({
          status: 401,
          message: 'User Not Found!',
        });
      }
    })
    .catch(err => console.log(err));
});

//  POST Sign up.
//  /api/auth/signup
router.post('/signup', function (req, res) {
  // validate request
  let isValid = true;

  // Validation
  if (!validator(req.body.password, true)) isValid = false;
  if (!validator(req.body.email, true, undefined, true)) isValid = false;
  if (!validator(req.body.name, true, true, undefined)) isValid = false;
  if (!validator(req.body.surname, true, true, undefined)) isValid = false;

  console.log(req.body)

  if (!isValid)
    res.send(400, {
      status: '400 Bad Request ',
      message: 'Request data is not valid!',
    });
  else {
    //    hash the password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // if user not found
    const users = Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user) {
        res.send(200, {
          message: 'User Already Exists!',
        });
      } else {
        //  add user
        Users.create({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: hashedPassword,
        }).catch(errHandler => console.log('Error', errHandler));
        res.sendStatus(200,{status:200,message:'Success'});
      }
    });
  }
});

module.exports = router;