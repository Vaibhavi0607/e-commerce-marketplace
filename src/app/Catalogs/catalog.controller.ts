import { User } from '../../models/User';
import { Request, Response } from 'express';
import { Catalog } from '../../models/Catalogs';
import { logger } from '../../utils/logger';

export const createCatalog = async (req: Request, res: Response) => {
    logger.info('Creating catalog in controller');
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.body.userType)
    if (req.body.userType !== 'SELLER') {
      return res.status(400).json({ message: 'Cannot create catalog for non seller' });
    }
    if (user.catalog) {
      return res.status(200).json({ message: 'Catalog already exists for this user' });
    }
    const catalogData = new Catalog({
      userId: req.params.user_id,
      userType: req.body.userType,
    });
    await User.updateOne({ _id: req.params.seller_id }, { $set: { catalog: catalogData } });
    await catalogData.save();
    logger.info('Catalog created');
    res.status(200).json({ message: catalogData });
}

export const removeCatalog = async (req: Request, res: Response) => {
    logger.info('Removing catalog in controller');
    //Check if catalog exists
    logger.info('Searching catalog id', req.params.catalog_id)
    const catalog = await Catalog.findById(req.params.catalog_id);
    if (!catalog) {
      return res.status(404).json({ message: 'Catalog not found' });
    }
    const catalogToRemove = await Catalog.deleteOne({ _id: req.params.catalog_id });

    // Remove catalog from user
    logger.info('Removing catalog from user');
    await User.updateOne({ catalog: req.params.catalog_id}, {
      $unset: {
        catalog: ""
      }
    });
    logger.info('Catalog removed');
    res.status(200).json({ message: catalogToRemove });
}

export const getCatalog = async (req: Request, res: Response) => {
    logger.info('Fetching catalog of seller in controller');
    const isSeller = await User.findById({ _id: req.params.seller_id });
    console.log(isSeller?.userType)
    if (isSeller && isSeller.userType === 'BUYER') {
      return res.status(404).json({ message: 'Not a seller' });
    }
    const catalog = await Catalog.find({ userId: req.params.seller_id });
    if (catalog) {
      return res.status(404).json({ message: 'Catalog not found for mentioned seller ID' });
    }
    logger.info('Catalog found for seller');
    res.status(200).json({ message: catalog });
}
