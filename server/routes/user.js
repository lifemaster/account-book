const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const config = require('../helpers/constants').settings(process.env.NODE_ENV || 'dev');
const passport = require('../helpers/passport');
const checkToken = require('../helpers/checkToken');

const passportAuth = passport.authenticate('jwt', { session: false });

const requiredField = ['login', 'password', 'role', 'name'];
const requiredRoles = ['admin', 'user'];

module.exports = function(app) {
  // Sign in
  app.post('/api/sign-in', (req, res, next) => {
    if(!req.body.login || !req.body.password) {
      res.status(400).send('Login and password are required');
      return;
    }

    User.findOne({ login: req.body.login }, (err, user) => {
      if(!user) {
        res.status(401).send('Login or/and password are wrong');
      }
      else if(user.checkPassword(req.body.password)) {
        let payload = {id: user.id};
        let token = jwt.sign(payload, config.jwtSecret);

        user.addToken(token).then(userObj => {
          res.json({
            token: token,
            userObj: {
              _id: userObj.id,
              login: userObj.login,
              name: userObj.name,
              created: userObj.created,
              role: userObj.role
            }
          });
        }).catch(err => next(err));
      }
      else {
        res.status(401).send('Login or/and password are wrong');
      }
    });
  });

  // Sign out
  app.post('/api/sign-out', passportAuth, checkToken, (req, res, next) => {
    const token = req.headers.authorization;

    User.findById(req.user._id, (err, user) => {
      if(user) {
        user.removeToken(token.slice(4)) // remove part 'JWT ' from token origin
          .then(() => res.send('User has been signed out successfully'))
          .catch(err => res.status(404).send(err));
      }
      else {
        res.status(404).send('User not found');
      }
    });
  });

  // Sign up
  app.post('/api/sign-up', passportAuth, checkToken, (req, res, next) => {
    if(req.user.role !== 'admin') {
      res.status(403).send('You have no access to sign up users.');
      return;
    }

    for(let i=0; i<requiredField.length; i++) {
      let field = requiredField[i];

      if(!req.body[field]) {
        res.status(400).send('Required field: login, password, role, name');
        return;
      }

      if(typeof req.body[field] !== 'string') {
        res.status(400).send(`${field} must be string`);
        return;
      }

      if(field === 'role' && requiredRoles.indexOf(req.body[field]) === -1) {
        res.status(400).send(`Unsupported role ${req.body[field]}. It can be 'user' or 'admin'`);
        return;
      }
    }

    User.findOne({ $or: [{ login: req.body.login }, { name: req.body.name }]}, (err, user) => {
      if(user) {
        res.status(400).send('Login or/and name already exists');
      }
      else {
        req.body.created = Date.now();

        let user = new User(req.body);
        user.save(user, (err, user) => {
          if(err) return next(err);

          res.json({
            _id: user.id,
            login: user.login,
            name: user.name,
            created: user.created,
            role: user.role
          });
        });
      }
    });
  });

  // Edit user
  app.patch('/api/user/:id', passportAuth, checkToken, (req, res, next) => {
    if(req.user.role !== 'admin') {
      res.status(403).send('You have no access to change users.');
      return;
    }

    const userId = req.params.id;

    User.findOne({$and: [
      {_id : {$ne: userId}},
      {$or: [{login: req.body.login }, { name: req.body.name }]}
    ]}, (err, user) => {
      if(user) {
        res.status(400).send('Login or/and name already exists');
      }
      else {
        User.findById(userId, (err, user) => {
          if(user) {
            if(req.body.login && typeof req.body.login === 'string') {
              user.login = req.body.login;
            }

            if(req.body.password && typeof req.body.password === 'string') {
              user.password = req.body.password;
            }

            if(req.body.name && typeof req.body.name === 'string') {
              user.name = req.body.name;
            }

            if(req.body.role && requiredRoles.indexOf(req.body.role) >= 0) {
              user.role = req.body.role;
            }

            user.save((err, user) => {
              if(err) return next(err);

              res.json({
                _id: user.id,
                login: user.login,
                name: user.name,
                created: user.created,
                role: user.role
              });
            });
          }
          else {
            res.status(404).send('User not found');
          }
        });
      }
    });
  });

  // Remove user
  app.delete('/api/user/:id', passportAuth, checkToken, (req, res, next) => {
    if(req.user.role !== 'admin') {
      res.status(403).send('You have no access to change users.');
      return;
    }

    const userId = req.params.id;

    if(req.user.id === userId) {
      res.status(400).send('You can\'t delete yourself.');
      return;
    }

    User.findByIdAndRemove(userId, (err, user) => {
      if(err) return next(err);
      if(!user) return res.status(404).send('User not found');

      res.json({
        _id: user.id,
        login: user.login,
        name: user.name,
        created: user.created,
        role: user.role
      });
    });
  });

  // Get short user info by token
  app.get('/api/user', passportAuth, checkToken, (req, res, next) => {
    let user = req.user.toJSON();
    res.json({
      login: user.login,
      name: user.name,
      role: user.role,
      created: user.created
    });
  });

  // Get all users (only for admins)
  app.get('/api/users', passportAuth, checkToken, (req, res, next) => {
    if(req.user.role !== 'admin') {
      res.status(403).send('You have no access to get all users.');
      return;
    }

    User.find({}, (err, docs) => {
      let usersList = [];
      docs.forEach(user => {
        usersList.push({
          _id: user.id,
          login: user.login,
          name: user.name,
          created: user.created,
          role: user.role
        });
      });
      res.json(usersList);
    });
  });
}