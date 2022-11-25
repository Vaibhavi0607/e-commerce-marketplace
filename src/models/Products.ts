import mongoose from 'mongoose';

const productShema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: String,
    productPrice: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: true,
    },
    catalogId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Catalog',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Product = mongoose.model('Product', productShema);
