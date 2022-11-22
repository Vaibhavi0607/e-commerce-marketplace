/**
 * Buyer
 * orderProducts[]
 *
 */
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
    },
    orderedProducts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Order', orderSchema);
