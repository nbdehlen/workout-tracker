const express = require('express');

const router = express.Router();
const { createUser } = require('../../controllers/Admin');
const { emailExists, usernameExists } = require('../../middlewares/signUp');
const verifyToken = require('../../middlewares/jwtToken');
const { admin, superAdmin } = require('../../middlewares/roles');

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
router.get('/admin');
module.exports = router;
