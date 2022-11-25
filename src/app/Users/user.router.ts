import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

const router = Router();

// Register User
router.post('/api/auth/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = new User({ 
      username: req.body.username,
      password: hashedPassword,
      userType: req.body.userType,
      email: req.body.email,
      address: req.body.address,
      catalog: req.body.catalog   
    });
    await data.save();
    res.status(201).json('User created');
  } catch(error: any) {
    res.status(400).json(`Error in creating user: ${error.message}`);
  }
});

// Login User
router.post('/api/auth/login', async (req, res) => {
  let password = '';
  const existingUser = await User.findOne({username: req.body.username});
  if (!existingUser) {
    res.status(400).json('User not found');
  } else {
    password = existingUser.password;
  }
  try {
    if(await bcrypt.compare(req.body.password, password)) {
      res.status(200).json('Logged in successfully');
    } else {
      res.status(400).json('Password did not match');
    }
  } catch (error: any) {
    res.status(400).json(`Error in logging user: ${error.message}`);
  }
});

// Delete User by user id
router.delete('/api/remove/:userId', async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    if (!deleteUser) {
      res.status(400).json('User not found to delete');
    }
    res.status(200).json(deleteUser);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
});

// Get all Users
router.get('/api/get-all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json(`Error in getting all users: ${error.message}`);
  }
});

// Get all sellers
router.get('/api/buyer/list-of-sellers', async (req, res) => {
  try {
    const sellers = await User.find({ userType: 'SELLER'});
    if (sellers.length !== 0) {
      res.status(200).json(sellers);
    } else {
      res.status(400).json('No sellers found');
    }
  } catch (error: any) {
    res.status(400).json(`Error in getting sellers: ${error.message}`);
  }
});

// Get all buyers
router.get('/api/list-of-buyers', async (req, res) => {
  try {
    const buyers = await User.find({ userType: 'BUYER'});
    if (buyers.length !== 0) {
      res.status(200).json(buyers);
    } else {
      res.status(400).json('No buyers found');
    }
  } catch (error: any) {
    res.status(400).json(`Error in getting sellers: ${error.message}`);
  }
});

export const userRouter = router;
