import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['SELLER', 'BUYER'],
      default: 'BUYER',
    },
    email: {
      type: String,
      required: true,
    },
    address: String,
    catalog: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Catalog',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Users', userSchema);
