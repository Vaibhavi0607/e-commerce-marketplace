import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import { logger } from './utils/logger';
dotenv.config();

const app = express();
app.use(express.json());

// Import Routes
import { userRouter } from './app/Users/user.router';
import { catalogRouter } from './app/Catalogs/catalog.router';
import { productRouter } from './app/Products/product.router';
import { orderRouter } from './app/Orders/order.router';

// Routes Middleware
app.use(bodyparser.json());
app.use('/users', userRouter);
app.use('/catalog', catalogRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// Initialize db
mongoose.connect(process.env.MONGOURL, () => {
  logger.info('Connected to database');
});

export const server = app.listen('3000', () => {
  logger.info('Listening to port 3000');
});
