const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model.js')
const generateToken = require('./utils/generateToken');
const restricted = require('./authenticate-middleware.js')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash; 

  db.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error);
  });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          console.log(
            `password stored: ${password}, password passed: ${user.password}`)
          res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
          console.log(
            `password stored: ${password}, password passed: ${user.password}, user: ${user.username}`)
          res.status(401).json({ message: "sorry, try again" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: `server error ${error}` });
      });
  } else {
    res.status(400).json({ message: `username and password required` });
  }
});

router.get('/users', restricted, (req, res) => {
  db.findUsers()
    .then(users => {
      res.json({ loggedInUser: req.username, users });
    })
    .catch(err => res.send(err));
});

module.exports = router;
