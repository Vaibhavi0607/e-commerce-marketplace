"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['SELLER', 'BUYER'],
        default: 'BUYER',
    },
    email: {
        type: String,
        required: true,
    },
    address: String,
    catalog: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Catalog',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose_1.default.model('Users', userSchema);
