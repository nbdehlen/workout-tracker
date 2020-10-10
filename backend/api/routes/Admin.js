const express = require('express');

const router = express.Router();
const { createUser, deleteUser } = require('../../controllers/Admin');
const { emailExists, usernameExists } = require('../../middlewares/signUp');
const verifyToken = require('../../middlewares/jwtToken');
const { admin, superAdmin } = require('../../middlewares/roles');
const { route } = require('./Auth');

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post(
  '/admin',
  [verifyToken, admin, emailExists, usernameExists],
  createUser,
);

router.delete('/admin/:userId', [verifyToken, admin], deleteUser);
router.get('/admin');
module.exports = router;
