
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    minlength: [2, 'At least 2 characters required']
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format']
  },

  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'superadmin'],
      message: '{VALUE} is not valid'
    },
    default: 'user'
  },

  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age is too large']
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

const user = mongoose.model('User', userSchema);

module.exports = user;
