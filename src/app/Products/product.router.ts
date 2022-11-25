import { Router } from 'express';
import { Product } from '../../models/Products';

const router = Router();

//Create product and add to catalog
router.post('/api/add-product', async (req, res) => {//TODO: check if user to create product is seller only
    const productData = new Product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        owner: req.body.owner,
        catalogId: req.body.catalogId
    });
    await productData.save();
    res.status(200).json(productData);

});

//View products for catalog
router.get('/api/get-products/:seller_id', async (req, res) => {
    const products = await Product.findById({owner: req.params.seller_id});
    if (!products) {
        res.status(400).json('There are no products added to sell for mentioned seller');
    }
    res.status(200).json(products);
});

//Remove products
router.delete('/api/remove-product/:product_id', async (req, res) => {
    try {
        const deleteProduct = await Product.deleteOne({ _id: req.params.product_id });
        if (!deleteProduct) {
          res.status(400).json('User not found to delete');
        }
        res.status(200).json(deleteProduct);
    } catch (error: any) {
        res.status(400).json(error.message);
    }
});

export const productRouter = router;
