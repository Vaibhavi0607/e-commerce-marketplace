import { Router } from 'express';
import { Catalog } from '../../models/Catalogs';
import { User } from '../../models/User';
import { addCatalogValidator } from './catalog.validator';
import { logger } from '../../utils/logger';

const router = Router();

// Create catalog
router.post('/api/seller/create-catalog/:seller_id', addCatalogValidator, async (req, res) => {
  logger.info('Creating catalog for seller');
  try {
    const user = await User.findById(req.params.seller_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (req.body.userType !== 'SELLER') {
      return res.status(400).json({ message: 'Cannot create catalog for non seller' });
    }
    if (user.catalog) {
      return res.status(500).json({ message: 'Catalog already exists for this user' });
    }
    const catalogData = new Catalog({
      userId: req.params.seller_id,
      userType: req.body.userType,
    });
    await User.updateOne({ _id: req.params.seller_id }, { $set: { catalog: catalogData } });
    await catalogData.save();
    logger.info('Catalog created');
    res.status(200).json({ message: 'Catalog is created successfully' });
  } catch (error: any) {
    logger.error('Error in creating catalog');
    res.status(500).json({ message: `${error.message}` });
  }
});

// Remove catalog
router.delete('/api/remove/seller-catalog/:catalog_id', async (req, res) => {
  logger.info('Removing catalog');
  try {
    //Check if catalog exists
    const catalog = await Catalog.findById(req.params.catalog_id);
    if (!catalog) {
      return res.status(400).json({ message: 'Catalog not found' });
    }

    const catalogToRemove = await Catalog.deleteOne({ _id: req.params.catalog_id });

    // Remove catalog from user
    const removeCatalogFromUSer = await User.find({ catalog: req.params.catalog_id });
    if (removeCatalogFromUSer && removeCatalogFromUSer[0].catalog) {
      removeCatalogFromUSer[0].catalog = undefined;
      await removeCatalogFromUSer[0].save();
    }
    logger.info('Catalog removed');
    res.status(200).json({ message: catalogToRemove });
  } catch (error: any) {
    logger.error('Error in removing catalog');
    res.status(400).json({ message: error.message });
  }
});

//Get catalog of seller by seller id
router.get('/api/buyer/seller-catalog/:seller_id', async (req, res) => {
  logger.info('Getting catalog of seller by seller id');
  try {
    const isSeller = await User.findById({ _id: req.params.seller_id });
    if (isSeller && isSeller.userType === 'BUYER') {
      return res.status(500).json({ message: 'Not a seller' });
    }
    const catalog = await Catalog.find({ userId: req.params.seller_id });
    if (!catalog) {
      return res.status(400).json({ message: 'Catalog not found for mentioned seller ID' });
    }
    logger.info('Catalog found for seller');
    res.status(200).json({ message: catalog });
  } catch (error: any) {
    logger.error('Error in getting for seller id');
    res.status(400).json({ message: `Error in fetching catalog of seller: ${error.message}` });
  }
});

export const catalogRouter = router;
