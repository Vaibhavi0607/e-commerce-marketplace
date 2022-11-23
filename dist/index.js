"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// const mongooseOptions = { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// };
// Import Routes
var user_router_1 = require("./app/Users/user.router");
// Routes Middleware
app.use('/users', user_router_1.userRouter);
// Initialize db
mongoose_1.default.connect(process.env.MONGOURL, function () {
    console.log('Connected to database');
});
app.listen('3000', function () {
    console.log('Listening to port 3000');
});
