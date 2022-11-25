"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var productShema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: String,
    productPrice: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true,
    },
    catalogId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Catalog',
        required: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
exports.Product = mongoose_1.default.model('Product', productShema);
