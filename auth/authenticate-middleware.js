/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require('bcryptjs');
const Users = require('../users/user-model.js');
module.exports = (req, res, next) => {
 
  console.log('req session', req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'You Shall not Pass!' });
  }
};
