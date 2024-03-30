"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModel = exports.PortfolioItemModel = exports.BalanceSchema = exports.PortfolioItemSchema = void 0;
var mongoose_1 = require("mongoose");
// export interface Portfolio extends Document {
//     balance: number;
//     portfolioItem: PortfolioItem[];
// }
exports.PortfolioItemSchema = new mongoose_1.Schema({
    ticker: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0, required: true },
    average: { type: Number, default: 0, required: true },
    totalCost: { type: Number, default: 0, required: true },
    change: { type: Number, default: 0, required: true },
    c: { type: Number, required: true },
    marketValue: { type: Number, default: 0, required: true },
    color: { type: String, default: 'text-dark', required: true }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
exports.BalanceSchema = new mongoose_1.Schema({
    balance: { type: Number, default: 25000.00, required: true }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
// export const PortfolioModel = model<Portfolio>('portfolio', PortfolioSchema);
exports.PortfolioItemModel = (0, mongoose_1.model)('portfolioItem', exports.PortfolioItemSchema);
exports.BalanceModel = (0, mongoose_1.model)('balance', exports.BalanceSchema);
