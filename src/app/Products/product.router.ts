import { Router } from 'express';
import { addProductValidator } from './product.validator';
import { logger } from '../../utils/logger';
import * as controller from './product.controller';

const router = Router();

//Create product and add to catalog
router.post('/api/add-product', addProductValidator, async (req, res) => {
  logger.info('Adding product to catalog');
  try {
    await controller.createProduct(req, res);
  } catch (error: any) {
    logger.error('Error in adding product to catalog');
    res.status(500).json({ message: `Error in adding product to catalog: ${error.message}` });
  }
});

//View products for catalog
router.get('/api/get-products/catalog/:catalog_id', async (req, res) => {
  logger.info('Getting products from mentioned catalog');
  try {
    await controller.viewProduct(req, res);
  } catch (error: any) {
    logger.error('Error in getting products for mentioned catalog');
    res.status(500).json({ message: `Error in getting products: ${error.message}` });
  }
});

//Remove products
router.delete('/api/remove-product/:product_id/catalog/:catalog_id', async (req, res) => {
  logger.info('Removing products');
  try {
    await controller.removeProduct(req, res);
  } catch (error: any) {
    logger.error('Error in removing product');
    res.status(400).json({ message: error.message });
  }
});

export const productRouter = router;
