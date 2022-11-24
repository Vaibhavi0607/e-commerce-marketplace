import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['SELLER', 'BUYER'],
      default: 'BUYER',
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    address: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const User =  mongoose.model('Users', userSchema);
