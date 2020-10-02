const express = require('express');

const router = express.Router();
const { postLogin, postSignUp } = require('../../controllers/Auth');
const {
  emailExists,
  usernameExists,
  rolesExists,
} = require('../../middlewares/signUp');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

router.post('/auth/signup', [emailExists, usernameExists, rolesExists, postSignUp]);
router.post('/auth/login', postLogin);
module.exports = router;
