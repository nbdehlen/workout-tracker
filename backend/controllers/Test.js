const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

const userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

const superAdminBoard = (req, res) => {
  res.status(200).send('Super admin Content.');
};

module.exports = {
  allAccess,
  userBoard,
  adminBoard,
  superAdminBoard,
};
