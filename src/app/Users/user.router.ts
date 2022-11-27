import { Router } from 'express';
import * as validator from './user.validator';
import { logger } from '../../utils/logger';
import * as controller from './user.controller';

const router = Router();

// Register User
router.post('/api/auth/register', validator.registerUserValidator, async (req, res) => {
  logger.info('Registering user');
  try {
    await controller.registerUser(req, res);
  } catch (error: any) {
    logger.error('Error in creating user');
    res.status(400).json({ message: `Error in creating user: ${error.message}` });
  }
});

// Login User
router.post('/api/auth/login', async (req, res) => {
  await controller.loginUser(req, res);
});

// Delete User by user id
router.delete('/api/remove/:userId', validator.userIdValidator, async (req, res) => {
  logger.info('Deleting user');
  try {
    await controller.deleteUser(req, res);
  } catch (error: any) {
    logger.error('Error in removing user');
    res.status(400).json({ message: error.message });
  }
});

// Get all Users
router.get('/api/get-all-users', async (req, res) => {
  logger.info('Fetching all users');
  try {
    await controller.getAllUsers(req, res);
  } catch (error: any) {
    logger.error('Error in fetching users');
    res.status(400).json({ message: `Error in getting all users: ${error.message}` });
  }
});

// Get all sellers
router.get('/api/buyer/list-of-sellers', async (req, res) => {
  logger.info('Fetching all users as sellers');
  try {
    await controller.getAllSellers(req, res);
  } catch (error: any) {
    logger.error('Error in fetching all users as sellers');
    res.status(400).json({ message: `Error in getting sellers: ${error.message}` });
  }
});

// Get all buyers
router.get('/api/list-of-buyers', async (req, res) => {
  logger.info('Fetching all users as buyers');
  try {
    await controller.getAllBuyers(req, res);
  } catch (error: any) {
    logger.error('Error in fetching all users as buyers');
    res.status(400).json({ message: `Error in getting buyers: ${error.message}` });
  }
});

// Get a specific user
router.get('/api/user/:user_id', validator.userIdValidator, async (req, res) => {
  logger.info('Fetching user by user id');
  try {
    await controller.getSpecificUser(req, res);
  } catch (error: any) {
    logger.error('Error in fetching user by id');
    res.status(500).json({ message: `Error in fetching user: ${error.message}` });
  }
});

export const userRouter = router;
