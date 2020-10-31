const User = require('../db/schema/UserSchema');
const ROLES = require('../db/constants');

const usernameExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// const rolesExists = (req, res, next) => {
//   const { roles } = req.body;
//   if (roles) {
//     roles.forEach(role => {
//       if (!ROLES.includes(role)) {
//         res.status(400).json({
//           message: `Failed! Role ${role} does not exist!`,
//         });
//       }
//     });
//   }
//   next();
// };

module.exports = {
  usernameExists,
  emailExists,
};
