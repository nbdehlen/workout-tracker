require('dotenv').config();
const mongoose = require('mongoose');


const connect = async () => {
// function connect() {
  // return new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'test') {
    // const mongoUri = process.env.DB_CON;


    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = new MongoMemoryServer(mongoose);

    mongoose.Promise = Promise;
    mongoServer.getUri().then((mongoUri) => {
      const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: 5,
        reconnectInterval: 1000,
      };


      mongoose.connect(mongoUri, mongooseOpts);

      mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);
          mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
      });

      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
      });
    });
  } else {
    try {
      await mongoose.connect(process.env.DB_CON, { useUnifiedTopology: true, useNewUrlParser: true },
        () => console.log('connected to DB!'));
    } catch (error) {
      console.log(error.message);
    }
  }
  // });
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connect, disconnect };
