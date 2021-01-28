require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../db/schema/UserSchema")
const Role = require("../db/schema/RoleSchema")

const postSignUp = async (req, res) => {
  const { username, email, password } = req.body

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username needs to be at least 3 characters long" })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password needs to be at least 6 characters long" })
  }

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  })

  try {
    const assignRoleUser = await Role.findOne({ name: "user" })
    user.roles = [assignRoleUser._id]
    await user.save()
    return res.json({ message: "User was registered successfully!" })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const postLogin = async (req, res) => {
  const { username, password } = req.body

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username needs to be at least 3 characters long" })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password needs to be at least 6 characters long" })
  }

  try {
    const user = await User.findOne({ username }).populate("roles", "-__v")
    //TODO: seems to login username: "" and pw: ""
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "365d",
    })

    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    )
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: "User Not found." })
  }
}

module.exports = { postSignUp, postLogin }
