const mongoose = require('mongoose');
const config = require('config');

const connectMongoose = async () => {
  try {
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(config.get('database.uri'));
    console.log(`MongoDB connected successfully at: ${db.connection.host}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

module.exports = connectMongoose;
