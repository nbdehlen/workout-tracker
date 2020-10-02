require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  try {
    const verify = await jwt.verify(token, process.env.SECRET);
    req.userId = verify.id;
    return next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

module.exports = verifyToken;
