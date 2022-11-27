import { User } from "../../models/User";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { logger } from "../../utils/logger";

export const registerUser = async (req: Request, res: Response) => {
    logger.info('Registering user in controller');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = new User({
      username: req.body.username,
      password: hashedPassword,
      userType: req.body.userType,
      email: req.body.email,
      address: req.body.address,
      catalog: req.body.catalog,
    });
    await data.save();
    logger.info('User registered');
    res.status(201).json({ message: 'User created' });
}

export const loginUser = async (req: Request, res: Response) => {
    logger.info('Login in user in controller');
    let password = '';
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
    } else {
        password = existingUser.password;
    }
    try {
        if (await bcrypt.compare(req.body.password, password)) {
        logger.info('User logged in successfully');
        res.status(200).json({ message: 'Logged in successfully' });
        } else {
        return res.status(400).json({ message: 'Password did not match' });
        }
    } catch (error: any) {
        res.status(400).json({ message: `Error in logging user: ${error.message}` });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    logger.info('Deleting user in controller');
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deleteUser = await User.deleteOne({ _id: req.params.userId });
    logger.info('User removed');
    res.status(200).json({ message: deleteUser });
}

export const getAllUsers = async (req: Request, res: Response) => {
    logger.info('Fetching all users in controller');
    const users = await User.find();
    logger.info('Users fetched');
    res.status(200).json({ message: users });
}

export const getAllSellers = async (req: Request, res: Response) => {
    logger.info('Fetcing all sellers in controller');
    const sellers = await User.find({ userType: 'SELLER' });
    if (sellers.length !== 0) {
      logger.info('Retrieved all sellers');
      res.status(200).json({ message: sellers });
    } else {
      res.status(400).json({ message: 'No sellers found' });
    }
}

export const getAllBuyers = async (req: Request, res: Response) => {
    logger.info('Fetching all buyers in controller');
    const buyers = await User.find({ userType: 'BUYER' });
    if (buyers.length !== 0) {
      logger.info('Retrieved all buyers');
      res.status(200).json({ message: buyers });
    } else {
      res.status(400).json({ message: 'No buyers found' });
    }
}

export const getSpecificUser = async (req: Request, res: Response) => {
    logger.info('Fetching specific user in controller');
    const user = await User.findById(req.params.user_id);
    if (user) {
      logger.info('User fetched');
      res.status(200).json({ message: user });
    }
}
