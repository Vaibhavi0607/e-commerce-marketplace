import { Router } from 'express';
import { Product } from '../../models/Products';
import { Catalog } from '../../models/Catalogs';
import { User } from '../../models/User';
import { addProductValidator } from './product.validator';
import { logger } from '../../utils/logger';

const router = Router();

//Create product and add to catalog
router.post('/api/add-product', addProductValidator, async (req, res) => {
  logger.info('Adding product to catalog');
  try {
    //Check if user is seller
    const isSeller = await User.findById(req.body.owner);
    if (isSeller && isSeller.userType !== 'SELLER') {
      return res.status(500).json({ message: 'Invalid account' });
    }
    const productData = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      owner: req.body.owner,
      catalogId: req.body.catalogId,
    });

    //Add products to catalog
    const catalog = await Catalog.findById(req.body.catalogId);
    if (!catalog) {
      return res.status(500).json({ message: 'Invalid catalog' });
    }
    catalog.products.push(Object(productData));
    await catalog.save();

    await productData.save();
    logger.info('Product added to catalog');
    res.status(200).json({ message: productData });
  } catch (error: any) {
    logger.error('Error in adding product to catalog');
    res.status(500).json({ message: `Error in adding product to catalog: ${error.message}` });
  }
});

//View products for catalog
router.get('/api/get-products/catalog/:catalog_id', async (req, res) => {
  logger.info('Getting products from mentioned catalog');
  try {
    const products = await Catalog.findById(req.params.catalog_id);
    if (!products) {
      res.status(400).json({ message: 'There are no products added to sell for mentioned seller' });
    }
    logger.info('Fetched products from mentioned catalog');
    res.status(200).json({ message: products });
  } catch (error: any) {
    logger.error('Error in getting products for mentioned catalog');
    res.status(500).json({ message: `Error in getting products: ${error.message}` });
  }
});

//Remove products
router.delete('/api/remove-product/:product_id/catalog/:catalog_id', async (req, res) => {
  logger.info('Removing products');
  try {
    const product = await Product.findById(req.params.product_id);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
    const deleteProduct = await Product.deleteOne({ _id: req.params.product_id });

    //Remove product from catalog
    await Catalog.findByIdAndUpdate(
      req.params.catalog_id,
      {
        $pull: {
          products: req.params.product_id,
        },
      },
      { new: true }
    );
    logger.info('Product removed');
    res.status(200).json({ message: deleteProduct });
  } catch (error: any) {
    logger.error('Error in removing product');
    res.status(400).json({ message: error.message });
  }
});

export const productRouter = router;
