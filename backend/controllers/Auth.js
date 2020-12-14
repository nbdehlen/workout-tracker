require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../db/schema/UserSchema");
const Role = require("../db/schema/RoleSchema");

// make sure signUp gives 'user' role only.

const postSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  try {
    const assignRoleUser = await Role.findOne({ name: "user" });
    user.roles = [assignRoleUser._id];
    await user.save();
    return res.json({ message: "User was registered successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate("roles", "-__v");

    // if (!user) {
    //   return res.status(404).json({ message: 'User Not found.' });
    // }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 * 30, // 24 hours*30
    });

    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
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
    return res.status(404).json({ message: "User Not found." });
  }
};

module.exports = { postSignUp, postLogin };
