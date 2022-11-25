import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
    },
    userType: {
      type: mongoose.SchemaTypes.String,
      ref: 'Users',
      required: true,
    },
    products: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Catalog = mongoose.model('Catalog', catalogSchema);
