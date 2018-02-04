const passport = require('./passport');
const User = require('../schemas/user');

module.exports = function(req, res, next) {
  const token = req.headers.authorization.slice(4);

  User.findById(req.user.id, (err, user) => {
    if(user.activeTokens.indexOf(token) >= 0) {
      next();
    }
    else {
      res.status(401).send('Token is expired');
    }
  });
}