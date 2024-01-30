// authMiddleware.js
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const secretKey = process.env.JWT_SECRET || '00100';

const mongoURI = "mongodb+srv://vanesataneva:vanesa@v.ynn3vea.mongodb.net/"

const authMiddleware = async (req, res, next) => {
  let client; // Declare the client outside the try block for proper cleanup in the finally block
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Connect to MongoDB using the connection string
    client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the database directly from the connection string (no need for separate dbName)
    const db = client.db();

    const usersCollection = db.collection('users');

    // Find the user in the database
    const user = await usersCollection.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid user' });
    }

    // Attach the user information to the request object for further use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
};

module.exports = authMiddleware;
