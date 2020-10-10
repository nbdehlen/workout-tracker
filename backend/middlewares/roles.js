const Role = require('../db/schema/RoleSchema');
const User = require('../db/schema/UserSchema');

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    const isAdmin = roles.some((role) => role.name === 'admin');

    if (isAdmin) {
      return next();
    }

    return res.status(403).json({ message: 'Require admin Role!' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const superAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    const isSuperAdmin = roles.some((role) => role.name === 'super_admin');
    if (isSuperAdmin) {
      return next();
    }

    return res.status(403).json({ message: 'Require super admin Role!' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  admin,
  superAdmin,
};
