import { Router } from 'express';
import { addOrderValidator } from './order.validator';
import { logger } from '../../utils/logger';
import * as controller from './order.controller';

const router = Router();

// Create Order
router.post('/api/buyer/create-order/:seller_id', addOrderValidator, async (req, res) => {
  logger.info('Creating order for buyer');
  try {
    await controller.createOrder(req, res);
  } catch (error: any) {
    logger.error('Error in placing order');
    res.status(500).json({ message: `Error in placing order: ${error.message}` });
  }
});

// Retrieve order received by seller
router.get('/api/retrieve-order/seller/:seller_id', async (req, res) => {
  logger.info('Retrieving order received by seller');
  try {
    await controller.orderForSeller(req, res);
  } catch (error: any) {
    logger.error('Error getting order for seller');
    res.status(500).json({ message: `Error retrieving order: ${error.message}` });
  }
});

// Retreive order placed by buyer
router.get('/api/your-order/buyer/:buyer_id', async (req, res) => {
  logger.info('Retrieving order placed by buyer');
  try {
    await controller.orderByBuyer(req, res);
  } catch (error: any) {
    logger.error('Error in getting order by buyer');
    res.status(500).json({ message: `Error in retreiving your orders: ${error.message}` });
  }
});

// Remove product from orders
router.delete('/api/buyer/:buyer_id/remove-product/:order_id/product/:product_id', async (req, res) => {
  logger.info('Removing product from orders');
  try {
    await controller.removeProduct(req, res);
  } catch (error: any) {
    logger.error('Error in removing product from order');
    res.status(400).json({ message: `Error in removing product: ${error.message}` });
  }
});

router.delete('/api/remove/order/:order_id', async (req, res) => {
  logger.info('Removing order');
  try {
    await controller.removeOrder(req, res);
  } catch (error: any) {
    logger.error('Error in removing order');
    res.status(400).json({ message: `Error in removing order: ${error.message}` });
  }
});

export const orderRouter = router;
