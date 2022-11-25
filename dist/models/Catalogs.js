"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalog = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var catalogSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Users',
    },
    userType: {
        type: mongoose_1.default.SchemaTypes.String,
        ref: 'Users',
        required: true,
    },
    products: [
        {
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: 'Product',
        },
    ],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
exports.Catalog = mongoose_1.default.model('Catalog', catalogSchema);
