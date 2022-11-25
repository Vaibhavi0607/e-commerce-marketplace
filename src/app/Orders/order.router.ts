import { Router } from 'express';
import { Order } from '../../models/Order';
import { User } from '../../models/User';
import { Product } from '../../models/Products';

const router = Router();

// Create Order
router.post('/api/buyer/create-order/:seller_id', async (req, res) => {
    const seller = await User.findById(req.params.seller_id);
    if (!seller) {
        res.status(400).json({ 'message': 'Seller not found' });
    }
    const validateBuyer = await User.findById(req.body.buyerId);
    if (!validateBuyer) {
        res.status(400).json({ 'message': 'Invalid buyer' });
    } else if (validateBuyer && validateBuyer.userType === 'SELLER') {
        res.status(400).json({ 'message': 'Please place order with valid account' });
    }
    const order = new Order({
        buyerId: req.body.buyerId,
        orderedProducts: req.body.orderedProducts
    });

    // Add order list to buyer
    if (validateBuyer) {
        validateBuyer.orders.push(Object(order));
        validateBuyer.save();
    }

    // Add order of product to its user (Seller)
    if (seller) {
        seller.orders.push(Object(order));
        seller.save();
    }
    await order.save();
    res.status(200).json({ 'message': 'Order placed' });
});

// Retrieve order received by seller
router.get('/api/retrieve-order/seller/:seller_id', async (req, res) => {
    try {
        const orderList = await User.findById(req.params.seller_id);
        if (!orderList) {
            return res.status(500).json({ 'message': 'User not found' });
        } else {
            res.status(200).json({ 'message': {"received orders": orderList.orders} });
        }
    } catch (error: any) {
        res.status(500).json({ 'message': `Error retrieving order: ${error.message}` });
    }
});

// Retreive order placed by buyer
router.get('/api/your-order/buyer/:buyer_id', async (req, res) => {
    try {
        const orderListBuyer = await User.findById(req.params.buyer_id);
        if (!orderListBuyer) {
            return res.status(500).json({ 'message': 'User not found' });
        } else {
            res.status(200).json({ 'message': {"your orders": orderListBuyer.orders} });
        }
    } catch (error: any) {
        res.status(500).json({ 'message': `Error in retreiving your orders: ${error.message}` });
    }
});

// Remove product from order
router.delete('/api/buyer/:buyer_id/remove-product/:order_id/product/:product_id',async (req, res) => {
    try {
        const buyer = await User.findById(req.params.buyer_id);
        if (!buyer) {
            res.status(400).json({ 'message': 'Invalid account' });
        }
        const order = await Order.findById(req.params.order_id);
        if (!order) {
            res.status(400).json({ 'message': 'Order not found' });
        }
        const removeOrder = await Order.deleteOne({ _id: req.params.order_id});
        if (!removeOrder) {
            res.status(400).json({ 'message': 'Product not found' });
        }

        // Remove order item from Buyer's orders
        await User.findByIdAndUpdate(req.params.buyer_id, {
            $pull: {
                orders: req.params.order_id
            }
        }, {new: true});

        // Remove order item from Seller's orders
        let owner;
        const product = await Product.findById(req.params.product_id);
        if (product) {
            owner = product.owner;
        }
        await User.findByIdAndUpdate(owner, {
            $pull: {
                orders: req.params.order_id
            }
        }, {new: true});

        res.status(200).json({ 'message': removeOrder });
    } catch (error: any) {
        res.status(400).json({ 'message': `Error in removing product: ${error.message}` });
    }
});

export const orderRouter = router;