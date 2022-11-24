"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['SELLER', 'BUYER'],
        default: 'BUYER',
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    address: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
exports.User = mongoose_1.default.model('Users', userSchema);
