import { Router } from 'express';
import { Order } from '../../models/Order';
import { User } from '../../models/User';
import { Product } from '../../models/Products';

const router = Router();

// Create Order
router.post('/api/buyer/create-order/:seller_id', async (req, res) => {
    const seller = await User.findById(req.params.seller_id);
    if (!seller) {
        res.status(400).json('Seller not found');
    }
    const validateBuyer = await User.findById(req.body.buyerId);
    if (!validateBuyer) {
        res.status(400).json('Invalid buyer');
    } else if (validateBuyer && validateBuyer.userType === 'SELLER') {
        res.status(400).json('Please place order with valid account');
    }
    const order = new Order({
        buyerId: req.body.buyerId,
        orderedProducts: req.body.orderedProducts
    });
    await order.save();
    res.status(200).json('Order created');
});

// Retrieve order received by seller

// Remove product from order
router.delete('/api/buyer/:buyer_id/remove-product/:order_id/product/:product_id',async (req, res) => {
    try {
        const buyer = await User.findById(req.params.buyer_id);
        if (!buyer) {
            res.status(400).json('Invalid account');
        }
        const order = await Order.findById(req.params.order_id);
        if (!order) {
            res.status(400).json('Order not found');
        }
        const productToRemoveFromORder = await Product.deleteOne({ _id: req.params.product_id});
        if (!productToRemoveFromORder) {
            res.status(400).json('Product not found');
        }
    } catch (error: any) {
        res.status(400).json(`Error in removing product: ${error.message}`);
    }
});

export const orderRouter = router;