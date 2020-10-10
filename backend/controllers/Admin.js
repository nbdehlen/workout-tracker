require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db/schema/UserSchema');
const Role = require('../db/schema/RoleSchema');
const createError = require('http-errors');
const mongoose = require('mongoose');

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

    //gives user role if no roles given
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

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const adminId = req.userId;

  // console.log('req:', req);
  console.log(userId);
  console.log(adminId);

  //check role of user before deleting

  try {
    const user = await User.findOne({ _id: userId });

    // const result = await User.findByIdAndDelete({
    //   _id: userId,
    // });

    if (!user) {
      // return createError(404, `User ID ${userId} does not exist`);
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const userRoles = await Role.find({ _id: { $in: user.roles } });

    const userIsSuperAdmin = userRoles.some(
      (role) => role.name === 'super_admin',
    );

    if (userIsSuperAdmin) {
      // throw createError(400, `Not authorized to delete user ID ${userId}`);
      return res
        .status(400)
        .json({ message: `Not authorized to delete user ID ${userId}` });
    }

    const userIsAdmin = userRoles.some((role) => role.name === 'admin');

    const admin = await User.findOne({ _id: adminId });
    const adminRoles = await Role.find({ _id: { $in: admin.roles } });
    const adminIsSuperAdmin = adminRoles.some(
      (role) => role.name === 'super_admin',
    );

    if (admin && !adminIsSuperAdmin) {
      // throw createError(400, `Not authorized to delete user ID ${userId}`);
      return res
        .status(400)
        .json({ message: `Not authorized to delete user ID ${userId}` });
    }

    await user.deleteOne();

    return res.status(200).json({
      message: `Deleted user ${userId}`,
    });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      // throw createError(400, `User ID ${userId} is invalid`);
      return res.status(400).json({ message: `User ID ${userId} is invalid` });
    }
    // throw createError(500, error);
    return res.status(500).json({ message: error });
  }
};

module.exports = { createUser, deleteUser };
