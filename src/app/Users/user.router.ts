import { Router } from 'express';

const router = Router();
// Register User
router.post('/api/auth/register', (req, res) => {
  res.send('Register');
});

// Login User

// Delete User

// Get all Users

// Get all sellers

// Get all buyers

export const userRouter = router;
