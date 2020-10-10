const express = require('express');
const verifyToken = require('../../middlewares/jwtToken');
const { admin, superAdmin } = require('../../middlewares/roles');
const {
  allAccess,
  userBoard,
  adminBoard,
  superAdminBoard,
} = require('../../controllers/User');

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.get('/test/all', allAccess);

router.get('/test/user', [verifyToken], userBoard);

router.get('/test/admin', [verifyToken, admin], adminBoard);

router.get('/test/super_admin', [verifyToken, superAdmin], superAdminBoard);

module.exports = router;
