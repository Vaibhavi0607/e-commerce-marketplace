import { Router } from 'express';
import { Catalog } from '../../models/Catalogs';
import { User } from '../../models/User'

const router = Router();

// Create catalog
router.post('/api/seller/create-catalog/:seller_id', async (req, res) => {
    const user = await User.findById(req.params.seller_id);
    if (!user) {
        res.status(400).json('User not found');
    }

    if (req.body.userType !== 'SELLER') {
        res.status(400).json('Cannot create catalog for non seller');
    }

    const catalogData = new Catalog({
        userId: req.params.seller_id,
        userType: req.body.userType
    });
    await catalogData.save();
});

// Remove catalog
router.delete('/api/remove/seller-catalog/:catalog_id', async (req, res) => {
    try {
        const catalogToRemove = await User.deleteOne({ _id: req.params.catalog_id });
        if (!catalogToRemove) {
          res.status(400).json('User not found to delete');
        }
        res.status(200).json(catalogToRemove);
      } catch (error: any) {
        res.status(400).json(error.message);
    }
});


//Get catalog of seller by seller id
router.get('/api/buyer/seller-catalog/:seller_id', async (req, res) => {
    try {
        const catalogExists = await User.find({_id: req.params.seller_id}, {
            catalog: 1,
            _id: 0
        });
        if (catalogExists && catalogExists[0].$isEmpty('catalog')) {
            res.status(400).json('Catalog does not exists for mentioned seller ID');
        } else {
            res.status(400).json('Seller not found');
        }
        
        const catalog = Catalog.find({userId: req.params.seller_id});
        if (!catalog) {
            res.status(400).json('Catalog not found for mentioned seller ID');
        }
        
        res.status(200).json(catalog);
    } catch (error: any) {
        res.status(400).json(`Error in fetching catalog of seller: ${error.message}`);
    }
});

export const catalogRouter = router;
