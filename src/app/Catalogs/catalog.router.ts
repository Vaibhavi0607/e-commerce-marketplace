import { Router } from 'express';
import { addCatalogValidator } from './catalog.validator';
import { logger } from '../../utils/logger';
import * as controller from './catalog.controller'

const router = Router();

// Create catalog
router.post('/api/seller/create-catalog/:user_id', addCatalogValidator, async (req, res) => {
  logger.info('Creating catalog for seller');
  try {
    await controller.createCatalog(req, res);
  } catch (error: any) {
    logger.error('Error in creating catalog');
    res.status(500).json({ message: `${error.message}` });
  }
});

// Remove catalog
router.delete('/api/remove/seller-catalog/:catalog_id', async (req, res) => {
  logger.info('Removing catalog');
  try {
    await controller.removeCatalog(req, res);
  } catch (error: any) {
    logger.error(`Error in removing catalog: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

//Get catalog of seller by seller id
router.get('/api/buyer/seller-catalog/:seller_id', async (req, res) => {
  logger.info('Getting catalog of seller by seller id');
  try {
    await controller.getCatalog(req, res);
  } catch (error: any) {
    logger.error('Error in getting for seller id');
    res.status(500).json({ message: `Error in fetching catalog of seller: ${error.message}` });
  }
});

export const catalogRouter = router;
