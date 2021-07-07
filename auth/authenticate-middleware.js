const jwt = require('jsonwebtoken');

const secret = require('../auth/utils/secrets.js');

module.exports  = function restriced (req, res, next) {
  const token = req.headers.token;

  if (token) {
      jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
          if(err) {
            console.log(err, 'token', token)
            console.log(decodedToken)
              res.status(401).json({ message: 'Invalid credentials'})

          } else {
              console.log(decodedToken)
              console.log(req)
              req.username = decodedToken.username
              next();
          }
      });
  } else {
      res.status(400).json({ message: 'No Token Provided'})
  }

}