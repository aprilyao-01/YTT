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
var axios_1 = __importDefault(require("axios"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var insider_mid_1 = require("../middlewares/insider.mid");
var earning_mid_1 = require("../middlewares/earning.mid");
var news_mid_1 = require("../middlewares/news.mid");
var autocomplete_mid_1 = require("../middlewares/autocomplete.mid");
var profile_mid_1 = require("../middlewares/profile.mid");
var quote_mid_1 = require("../middlewares/quote.mid");
var router = (0, express_1.Router)();
// autocomplete
router.get("/autocomplete/:ticker", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/search', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                q: ticker
            }
        }).then(function (data) {
            res.send((0, autocomplete_mid_1.formatSearch)(data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// profile
router.get('/profile/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/stock/profile2', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(function (data) {
            res.send((0, profile_mid_1.formatProfile)(data.data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// quote
router.get('/quote/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/quote', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(function (data) {
            res.send((0, quote_mid_1.formatQuote)(data.data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// peers
router.get('/peers/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/stock/peers', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(function (data) {
            res.send(data.data);
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// news
router.get('/news/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker, end, start;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        end = new Date(Date.now());
        start = new Date(end);
        start.setDate(start.getDate() - 7); // 1 week before the current date
        axios_1.default.get('https://finnhub.io/api/v1/company-news', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker,
                from: (0, news_mid_1.formatDate)(start),
                to: (0, news_mid_1.formatDate)(end),
            }
        }).then(function (data) {
            res.send((0, news_mid_1.formatNews)(data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// recommendation
router.get('/recommendation/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/stock/recommendation', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(function (data) {
            res.send(data.data);
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// insider sentiment
router.get('/insider/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/stock/insider-sentiment', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker,
                from: '2022-01-01'
            }
        }).then(function (data) {
            res.send((0, insider_mid_1.formatInsider)(data.data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
// earnings
router.get('/earnings/:ticker', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        ticker = req.params.ticker.trim().toUpperCase();
        axios_1.default.get('https://finnhub.io/api/v1/stock/earnings', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(function (data) {
            res.send((0, earning_mid_1.formatEarning)(data));
        }).catch(function (err) {
            res.send({ error: err });
        });
        return [2 /*return*/];
    });
}); }));
exports.default = router;
