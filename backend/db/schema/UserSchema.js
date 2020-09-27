const mongoose = require('mongoose');
const strTrimLcLen50 = require('./utils/defSchemaObjects');

const UserSchema = mongoose.Schema({
  username: strTrimLcLen50,
  email: strTrimLcLen50,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
