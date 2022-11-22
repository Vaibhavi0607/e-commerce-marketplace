"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Register User
router.post('/api/auth/register', function (req, res) {
    res.send('Register');
});
// Login User
// Delete User
// Get all Users
// Get all sellers
// Get all buyers
module.exports = router;
