const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    lowercase: true,
    index: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",  
  },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;