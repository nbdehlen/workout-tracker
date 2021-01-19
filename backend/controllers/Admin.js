require("dotenv").config()
const bcrypt = require("bcryptjs")
const User = require("../db/schema/UserSchema")
const Role = require("../db/schema/RoleSchema")
const mongoose = require("mongoose")

const createUser = async (req, res) => {
  const { username, email, password, roles } = req.body

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  })

  try {
    if (roles) {
      console.log(roles)

      if (roles.includes("super_admin")) {
        return res.status(401).json({ message: "Not authorized!" })
      }

      const assignedRoles = await Role.find({ name: { $in: roles } })
      console.log(assignedRoles)
      console.log("assignedRoles.length:", assignedRoles.length)
      if (assignedRoles.length === 0) {
        return res.status(400).json({ message: "No valid roles found!" })
      }

      user.roles = assignedRoles.map((role) => role._id)

      await user.save()
      return res
        .status(201)
        .json({ message: "User was registered successfully!" })
    }

    //gives user the user role if no roles given
    const assignRoleUser = await Role.findOne({ name: "user" })
    user.roles = [assignRoleUser._id]
    await user.save()
    return res
      .status(201)
      .json({ message: "User was registered successfully!" })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params
  const adminId = req.userId

  try {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" })
    }

    const userRoles = await Role.find({ _id: { $in: user.roles } })

    const userIsSuperAdmin = userRoles.some(
      (role) => role.name === "super_admin"
    )

    if (userIsSuperAdmin) {
      return res
        .status(400)
        .json({ message: `Not authorized to delete user ID ${userId}` })
    }

    const admin = await User.findOne({ _id: adminId })
    const adminRoles = await Role.find({ _id: { $in: admin.roles } })
    const adminIsSuperAdmin = adminRoles.some(
      (role) => role.name === "super_admin"
    )

    if (admin && !adminIsSuperAdmin) {
      return res
        .status(400)
        .json({ message: `Not authorized to delete user ID ${userId}` })
    }

    await user.deleteOne()

    return res.status(200).json({
      message: `Deleted user ${userId}`,
    })
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: `User ID ${userId} is invalid` })
    }
    return res.status(500).json({ message: error })
  }
}

const getUsers = async (_, res) => {
  try {
    const users = await User.find({})

    if (!users) {
      return res.status(404).json({ message: "User database is empty!" })
    }

    const userData = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
    }))

    return res.status(200).json(userData)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

const editUser = async (req, res) => {
  const { userId } = req.params
  const adminId = req.userId

  try {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" })
    }

    const userRoles = await Role.find({ _id: { $in: user.roles } })

    const userIsSuperAdmin = userRoles.some(
      (role) => role.name === "super_admin"
    )

    if (userIsSuperAdmin) {
      return res.status(400).json({
        message: `Not authorized to edit properties of user ID ${userId}`,
      })
    }

    const userIsAdmin = userRoles.some((role) => role.name === "admin")

    const admin = await User.findOne({ _id: adminId })
    const adminRoles = await Role.find({ _id: { $in: admin.roles } })
    const adminIsSuperAdmin = adminRoles.some(
      (role) => role.name === "super_admin"
    )

    if (!admin) {
      return res.status(404).json({ message: `admin ID ${adminId} not found` })
    }

    if (userIsAdmin && !adminIsSuperAdmin) {
      return res.status(400).json({
        message: `Not authorized to edit properties of user ID ${userId}`,
      })
    }

    const { body } = req
    let result

    // need to check outgoung roles OR have separate routes for admin and superAdmin

    if (adminIsSuperAdmin) {
      result = await User.findOneAndUpdate(
        { _id: userId },
        { $set: body },
        { new: true }
      )
    } else {
      result = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            username: body.username || user.username,
            email: body.email || user.email,
          },
        },
        { new: true }
      )
    }

    return res.status(200).json({
      roles: result.roles,
      _id: result._id,
      username: result.username,
      email: result.email,
    })
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: `User ID ${userId} is invalid` })
    }
    return res.status(500).json({ message: error })
  }
}

module.exports = { createUser, deleteUser, getUsers, editUser }
