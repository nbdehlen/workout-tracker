const express = require('express');
const verifyToken = require('../../middlewares/jwtToken');
const { admin, moderator } = require('../../middlewares/roles');
const {
  allAccess, userBoard, moderatorBoard, adminBoard,
} = require('../../controllers/User');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

router.get('/test/all', allAccess);

router.get('/test/user', [verifyToken], userBoard);

router.get('/test/mod', [verifyToken, moderator], moderatorBoard);

router.get('/test/admin', [verifyToken, admin], adminBoard);

module.exports = router;
