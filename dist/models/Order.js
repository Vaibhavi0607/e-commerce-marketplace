"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Buyer
 * orderProducts[]
 *
 */
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.default.Schema({
    buyerId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    orderedProducts: [
        {
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose_1.default.model('Order', orderSchema);
