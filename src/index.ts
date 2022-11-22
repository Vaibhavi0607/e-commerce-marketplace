import express from 'express';

const app = express();

// Import Routes
import { userRouter } from './app/Users/user.router';

// Routes Middleware
app.use('/users', userRouter);

app.listen('3000', () => {
  console.log('Listening to port 3000');
});
