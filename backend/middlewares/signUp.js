const User = require("../db/schema/UserSchema")

const usernameExists = async (req, res, next) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" })
      return
    }
    next()
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const emailExists = async (req, res, next) => {
  const { email } = req.body
  try {
    const userEmail = await User.findOne({ email })

    if (userEmail) {
      res.status(400).send({ message: "Failed! Email is already in use!" })
      return
    }
    next()
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

module.exports = {
  usernameExists,
  emailExists,
}
