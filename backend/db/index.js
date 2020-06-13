const mongoose = require('mongoose');


const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CON, { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log('connected to DB!'));
  } catch (error) {
    console.log(error.message);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connect, disconnect };
