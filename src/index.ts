import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
dotenv.config();

const app = express();
app.use(express.json());

// Import Routes
import { userRouter } from './app/Users/user.router';

// Routes Middleware
app.use(bodyparser.json());
app.use('/users', userRouter);

// Initialize db
mongoose.connect(process.env.MONGOURL, () => {
  console.log('Connected to database')
});

app.listen('3000', () => {
  console.log('Listening to port 3000');
});
