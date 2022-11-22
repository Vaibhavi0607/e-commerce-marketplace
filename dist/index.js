"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
// Import Routes
var userRoutes = require('./app/Users/user.router');
// Routes Middleware
app.use('/users', userRoutes);
app.listen('3000', function () {
    console.log('Listening to port 3000');
});
