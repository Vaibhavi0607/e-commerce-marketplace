"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
// Routes Middleware
app.use(body_parser_1.default.json());
app.use('/users', user_router_1.userRouter);
app.use('/catalog', catalog_router_1.catalogRouter);
// Initialize db
mongoose_1.default.connect(process.env.MONGOURL, function () {
    console.log('Connected to database');
});
app.listen('3000', function () {
    console.log('Listening to port 3000');
});
