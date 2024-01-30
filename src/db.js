// server/src/db.js
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');


const MONGODB_URI= "mongodb+srv://vanesataneva:vanesa@v.ynn3vea.mongodb.net/"

const connectDB = async () => {
  try {
    const mongoURI = MONGODB_URI;


    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
