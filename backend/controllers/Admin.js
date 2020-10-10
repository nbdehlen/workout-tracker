require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db/schema/UserSchema');
const Role = require('../db/schema/RoleSchema');

// make sure signUp gives 'user' role only.

const createUser = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  try {
    if (roles) {
      console.log(roles);

      if (roles.includes('super_admin')) {
        return res.status(401).json({ message: 'Not authorized!' });
      }

      const assignedRoles = await Role.find({ name: { $in: roles } });
      console.log(assignedRoles);
      console.log('assignedRoles.length:', assignedRoles.length);
      if (assignedRoles.length === 0) {
        return res.status(400).json({ message: 'No valid roles found!' });
      }

      user.roles = assignedRoles.map((role) => role._id);

      await user.save();
      return res
        .status(201)
        .json({ message: 'User was registered successfully!' });
    }
    const assignRoleUser = await Role.findOne({ name: 'user' });
    user.roles = [assignRoleUser._id];
    await user.save();
    return res
      .status(201)
      .json({ message: 'User was registered successfully!' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate('roles', '-__v');

    // if (!user) {
    //   return res.status(404).json({ message: 'User Not found.' });
    // }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`,
    );
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'User Not found.' });
  }
};

module.exports = { createUser, postLogin };
