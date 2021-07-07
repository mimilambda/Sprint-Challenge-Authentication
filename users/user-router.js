const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/authenticate-middleware.js');

router.get('/', restricted, (req, res) => {
  // if the user is an admin they can see all users
  // if the user isn't an admin, they can only see themselves
  const { sub, role } = req.decodedToken;

  if (role === 'admin') {
    Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).send(err));
  } else {
    Users.findById(sub)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(500).send(err));
  }
});

module.exports = router; 