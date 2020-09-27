const User = require('../db/schema/UserSchema');
const ROLES = require('../db/constants');

const usernameExists = (req, res, next) => {
  const { username } = req.body;
  // Username
  User.findOne({
    username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
    next();
  });
};

const emailExists = (req, res, next) => {
  const { email } = req.body;
  // Email
  User.findOne({
    email,
  }).exec((err, userEmail) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (userEmail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }
    next();
  });
};

const rolesExists = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

module.exports = {
  usernameExists,
  emailExists,
  rolesExists,
};
