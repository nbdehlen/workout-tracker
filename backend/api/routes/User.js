const express = require('express');
const WorkoutSchema = require('../../db/schema/WorkoutSchema');

const router = express.Router();
const { verifyToken, isModerator, isAdmin } = require('../../middlewares/authJwt');
const { allAccess, userBoard, moderatorBoard, adminBoard } = require('../../controllers/User');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

router.get('/test/all', allAccess);

router.get('/test/user', [verifyToken], userBoard);

router.get('/test/mod', [verifyToken, isModerator], moderatorBoard);

router.get('/test/admin', [verifyToken, isAdmin], adminBoard);

module.exports = router;
