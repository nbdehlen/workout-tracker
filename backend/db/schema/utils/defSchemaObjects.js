const strTrimLcLen50 = {
  type: String,
  trim: true,
  maxlength: [50, 'Max char length is 50'],
  lowercase: true,
};

module.exports = strTrimLcLen50;
