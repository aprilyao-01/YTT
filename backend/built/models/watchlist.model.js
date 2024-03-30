"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchItemModel = exports.WatchItemSchema = void 0;
var mongoose_1 = require("mongoose");
exports.WatchItemSchema = new mongoose_1.Schema({
    ticker: { type: String, required: true },
    name: { type: String, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    dp: { type: Number, required: true },
    color: { type: String, default: 'text-dark', required: true }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
exports.WatchItemModel = (0, mongoose_1.model)('watchItem', exports.WatchItemSchema);
