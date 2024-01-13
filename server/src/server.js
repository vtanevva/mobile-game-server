const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 5173; // Update the port
const mongoURI = process.env.MONGODB_URI;

dotenv.config();
// MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
