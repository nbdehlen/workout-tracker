const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Max char length is 50'],
  },
});

module.exports = mongoose.model('Role', RoleSchema);
