"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Import Routes
var user_router_1 = require("./app/Users/user.router");
var catalog_router_1 = require("./app/Catalogs/catalog.router");
var product_router_1 = require("./app/Products/product.router");
var order_router_1 = require("./app/Orders/order.router");
// Routes Middleware
app.use(body_parser_1.default.json());
app.use('/users', user_router_1.userRouter);
app.use('/catalog', catalog_router_1.catalogRouter);
app.use('/product', product_router_1.productRouter);
app.use('/order', order_router_1.orderRouter);
// Initialize db
mongoose_1.default.connect(process.env.MONGOURL, function () {
    console.log('Connected to database');
});
exports.server = app.listen('3000', function () {
    console.log('Listening to port 3000');
});
