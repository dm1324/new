import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'creator'],
    required: true
  },
  avatar: String,
  creatorProfile: {
    handle: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    bio: String,
    followers: {
      type: Number,
      default: 0
    },
    categories: [String],
    storeLayout: {
      type: String,
      enum: ['default', 'minimal', 'grid', 'masonry'],
      default: 'default'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);