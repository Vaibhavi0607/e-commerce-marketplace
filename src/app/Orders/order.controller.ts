import { User } from "../../models/User";
import { Order } from "../../models/Order";
import { Product } from "../../models/Products";
import { logger } from "../../utils/logger";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
    logger.info('Creating order in controller');
    const seller = await User.findById(req.params.seller_id);
    if (!seller) {
      res.status(400).json({ message: 'Seller not found' });
    }
    const validateBuyer = await User.findById(req.body.buyerId);
    if (!validateBuyer) {
      res.status(400).json({ message: 'Invalid buyer' });
    } else if (validateBuyer && validateBuyer.userType === 'SELLER') {
      res.status(400).json({ message: 'Please place order with valid account' });
    }
    const order = new Order({
      buyerId: req.body.buyerId,
      orderedProducts: req.body.orderedProducts,
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
    logger.info('Order placed');
    res.status(200).json({ message: 'Order placed' });
}

export const orderForSeller = async (req: Request, res: Response) => {
    logger.info('Fetching orders for seller in controller');
    const orderList = await User.findById(req.params.seller_id);
    if (!orderList) {
      return res.status(500).json({ message: 'User not found' });
    } else {
      logger.info('Retrieved order received by seller');
      res.status(200).json({ message: { 'received orders': orderList.orders } });
    }
}

export const orderByBuyer = async (req: Request, res: Response) => {
    logger.info('Fetching orders by buyer in controller');
    const orderListBuyer = await User.findById(req.params.buyer_id);
    if (!orderListBuyer) {
      return res.status(500).json({ message: 'User not found' });
    } else {
      logger.info('Retrieved order placedby buyer');
      res.status(200).json({ message: { 'your orders': orderListBuyer.orders } });
    }
}

export const removeProduct = async (req: Request, res: Response) => {
    logger.info('Removing product from catalog in controller');
    const buyer = await User.findById(req.params.buyer_id);
    if (!buyer) {
      res.status(400).json({ message: 'Invalid account' });
    }
    const order = await Order.findById(req.params.order_id);
    if (!order) {
      res.status(400).json({ message: 'Order not found' });
    }
    const removeOrder = await Order.deleteOne({ _id: req.params.order_id });
    if (!removeOrder) {
      res.status(400).json({ message: 'Product not found' });
    }

    // Remove order item from Buyer's orders
    await User.findByIdAndUpdate(
      req.params.buyer_id,
      {
        $pull: {
          orders: req.params.order_id,
        },
      },
      { new: true }
    );

    // Remove order item from Seller's orders
    let owner;
    const product = await Product.findById(req.params.product_id);
    if (product) {
      owner = product.owner;
    }
    await User.findByIdAndUpdate(
      owner,
      {
        $pull: {
          orders: req.params.order_id,
        },
      },
      { new: true }
    );
    logger.info('Product removed from order');
    res.status(200).json({ message: removeOrder });
}

export const removeOrder = async (req: Request, res: Response) => {
  logger.info('Removing order in controller');
  try {
    const order = await Order.findByIdAndRemove(req.params.order_id);
    res.status(200).json({ mesasge: order});
  } catch (error: any) {
    logger.error('Error in removing product from order');
    res.status(400).json({ message: `Error in removing product: ${error.message}` });
  }
}
