"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var portfolio_model_1 = require("../models/portfolio.model");
var data_1 = require("../data");
var router = (0, express_1.Router)();
router.get('/seed', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var portfolioItemCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, portfolio_model_1.PortfolioItemModel.countDocuments()];
            case 1:
                portfolioItemCount = _a.sent();
                // const portfolioItemCount = await PortfolioModel.countDocuments();
                if (portfolioItemCount > 0) {
                    res.send({ message: 'PortfolioItem already seeded' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, portfolio_model_1.PortfolioItemModel.create(data_1.sample_portfolio.portfolioItem)];
            case 2:
                _a.sent();
                return [4 /*yield*/, portfolio_model_1.BalanceModel.create({ balance: 250000.00 })];
            case 3:
                _a.sent();
                res.send({ message: 'PortfolioItem seeded' });
                return [2 /*return*/];
        }
    });
}); }));
router.get('/', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var portfolioItem, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, portfolio_model_1.PortfolioItemModel.find()];
            case 1:
                portfolioItem = _a.sent();
                return [4 /*yield*/, portfolio_model_1.BalanceModel.findOne()];
            case 2:
                balance = _a.sent();
                if (!balance) {
                    res.send({ balance: 25000.00, portfolioItem: portfolioItem });
                    return [2 /*return*/];
                }
                else {
                    res.send({ balance: balance.balance, portfolioItem: portfolioItem });
                }
                console.log("request to /portfolio in db");
                return [2 /*return*/];
        }
    });
}); }));
router.post('/update', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, portfolio_model_1.PortfolioItemModel.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, portfolio_model_1.PortfolioItemModel.insertMany(req.body.portfolioItem)];
            case 2:
                _a.sent();
                return [4 /*yield*/, portfolio_model_1.BalanceModel.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, portfolio_model_1.BalanceModel.create({ balance: req.body.balance })];
            case 4:
                _a.sent();
                res.send({ message: 'Portfolio updated' });
                console.log("updated /portfolio in db");
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
