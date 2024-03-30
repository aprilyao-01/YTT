"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(function () { console.log('Connected to MongoDB'); }, function (err) { return console.error('Failed to connect to MongoDB', err); });
};
exports.dbConnect = dbConnect;
