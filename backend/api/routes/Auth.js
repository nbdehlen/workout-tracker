const express = require('express');

const router = express.Router();
const { postSignIn, postSignUp } = require('../../controllers/Auth');
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require('../../middlewares/verifySignUp');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

router.post('/auth/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted, postSignUp]);
router.post('/auth/signin', postSignIn);
module.exports = router;
