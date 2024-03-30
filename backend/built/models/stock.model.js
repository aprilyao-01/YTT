"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = exports.StockSchema = void 0;
var mongoose_1 = require("mongoose");
exports.StockSchema = new mongoose_1.Schema({
    ticker: { type: String, required: true },
    name: { type: String, required: true },
    exchange: { type: String, required: true },
    ipo: { type: String, required: true },
    // marketCapitalization: {type: Number, required: true},
    logo: { type: String, required: true },
    weburl: { type: String, required: true },
    finnhubIndustry: { type: String, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    dp: { type: Number, required: true },
    h: { type: Number, required: true },
    l: { type: Number, required: true },
    o: { type: Number, required: true },
    pc: { type: Number, required: true },
    t: { type: Number, required: true },
    peers: { type: [String], required: true },
    color: { type: String, required: false }
}, {
    // get from db and work on it
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
exports.StockModel = (0, mongoose_1.model)('stock', exports.StockSchema);
