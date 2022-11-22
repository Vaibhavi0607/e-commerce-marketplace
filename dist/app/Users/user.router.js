"use strict";
// eslint-disable-next-line no-undef
Object.defineProperty(exports, "__esModule", { value: true });
import { Router } from "express";
var router = (0, Router)();
// Register User
router.post('/api/auth/register', function (req, res) {
    res.send('Register');
});
// Login User
// Delete User
// Get all Users
// Get all sellers
// Get all buyers
export default router;
