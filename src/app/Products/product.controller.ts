import { User } from "../../models/User";
import { Catalog } from "../../models/Catalogs";
import { Product } from "../../models/Products";
import { Request, Response } from "express";
import { logger } from "../../utils/logger";

export const createProduct = async (req: Request, res: Response) => {
  logger.info('Creating product in controller');
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
}

export const viewProduct = async (req: Request, res: Response) => {
  logger.info('Fetching product in controller');
  const products = await Catalog.findById(req.params.catalog_id);
  console.log(products)
  if (products && products.products.length === 0) {
    res.status(400).json({ message: 'No products added to sell for mentioned seller' });
  }
  logger.info('Fetched products from mentioned catalog');
  res.status(200).json({ message: products });
}

export const removeProduct = async (req: Request, res: Response) => {
  logger.info('Removing product in controller');
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
}
