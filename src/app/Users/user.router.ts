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
    res.status(201).json({ 'message': 'User created' });
  } catch(error: any) {
    res.status(400).json({ 'message': `Error in creating user: ${error.message}` });
  }
});

// Login User
router.post('/api/auth/login', async (req, res) => {
  let password = '';
  const existingUser = await User.findOne({username: req.body.username});
  if (!existingUser) {
    return res.status(400).json({ 'message': 'User not found' });
  } else {
    password = existingUser.password;
  }
  try {
    if(await bcrypt.compare(req.body.password, password)) {
      res.status(200).json({ 'message': 'Logged in successfully' });
    } else {
      return res.status(400).json({ 'message': 'Password did not match' });
    }
  } catch (error: any) {
    res.status(400).json({ 'message': `Error in logging user: ${error.message}` });
  }
});

// Delete User by user id
router.delete('/api/remove/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ 'message': 'User not found' });
    }
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({ 'message': deleteUser });
  } catch (error: any) {
    res.status(400).json({ 'message': error.message });
  }
});

// Get all Users
router.get('/api/get-all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ 'message': users });
  } catch (error: any) {
    res.status(400).json({ 'message': `Error in getting all users: ${error.message}` });
  }
});

// Get all sellers
router.get('/api/buyer/list-of-sellers', async (req, res) => {
  try {
    const sellers = await User.find({ userType: 'SELLER'});
    if (sellers.length !== 0) {
      res.status(200).json({ 'message': sellers });
    } else {
      res.status(400).json({ 'message': 'No sellers found' });
    }
  } catch (error: any) {
    res.status(400).json({ 'message': `Error in getting sellers: ${error.message}` });
  }
});

// Get all buyers
router.get('/api/list-of-buyers', async (req, res) => {
  try {
    const buyers = await User.find({ userType: 'BUYER'});
    if (buyers.length !== 0) {
      res.status(200).json({ 'message': buyers });
    } else {
      res.status(400).json({ 'message': 'No buyers found' });
    }
  } catch (error: any) {
    res.status(400).json({ 'message': `Error in getting sellers: ${error.message}` });
  }
});

// Get a specific user
router.get('/api/user/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (user) {
      res.status(200).json({ 'message': user });
    }
  } catch (error: any) {
    res.status(500).json({ 'message': `Error in fetching user: ${error.message}` });
  }
});

export const userRouter = router;
