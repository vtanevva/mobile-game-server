// // This is just a placeholder. Replace it with your actual data model if needed.
// class User {
//     constructor(username, email) {
//       this.username = username;
//       this.email = email;
//     }
//   }
  
//   module.exports = User;
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
