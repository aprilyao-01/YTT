"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample_portfolio = exports.sample_watchItems = exports.sample_watchlist = exports.sample_stock = void 0;
exports.sample_stock = [
    {
        "country": "US",
        "currency": "USD",
        "estimateCurrency": "USD",
        "exchange": "NASDAQ NMS - GLOBAL MARKET",
        "finnhubIndustry": "Technology",
        "ipo": "1980-12-12",
        "logo": "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg",
        "marketCapitalization": 2665577.398546,
        "name": "Apple Inc",
        "phone": "14089961010",
        "shareOutstanding": 15441.88,
        "ticker": "AAPL",
        "weburl": "https://www.apple.com/",
        "c": 172.62,
        "d": -0.38,
        "dp": -0.2197,
        "h": 172.62,
        "l": 170.29,
        "o": 171,
        "pc": 173,
        "t": 1710532802,
        "peers": ["AAPL", "DELL", "SMCI", "HPQ", "1337.HK", "HPE", "NTAP", "WDC", "PSTG", "XRX"],
        "quantity": 3.00,
        "totalCost": 552.69
    },
    {
        "country": "US",
        "currency": "USD",
        "estimateCurrency": "USD",
        "exchange": "NEW YORK STOCK EXCHANGE, INC.",
        "finnhubIndustry": "Technology",
        "ipo": "2016-08-01",
        "logo": "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/DELL.svg",
        "marketCapitalization": 78475.46325685747,
        "name": "Dell Technologies Inc",
        "phone": "18002893355",
        "shareOutstanding": 706.34,
        "ticker": "DELL",
        "weburl": "https://www.delltechnologies.com/",
        "c": 107,
        "d": 0.55,
        "dp": 0.5167,
        "h": 108.98,
        "l": 105.64,
        "o": 107.044,
        "pc": 106.45,
        "t": 1710460800,
        "peers": ["AAPL", "DELL", "SMCI", "HPQ", "1337.HK", "HPE", "NTAP", "WDC", "PSTG", "XRX"],
        "quantity": 3.00,
        "totalCost": 2331.34
    },
];
exports.sample_watchlist = {
    "watchItem": [
        {
            "ticker": "AAPL",
            "name": "Apple Inc",
            "c": 172.62,
            "d": -0.38,
            "dp": -0.2197,
            "color": "text-danger"
        },
        {
            "name": "Dell Technologies Inc",
            "ticker": "DELL",
            "c": 107,
            "d": 0.55,
            "dp": 0.5167,
            "color": "text-success"
        },
        {
            "ticker": "No Change",
            "name": "Apple Inc",
            "c": 172.62,
            "d": 0,
            "dp": -0.2197,
            "color": "text-dark"
        },
    ]
};
exports.sample_watchItems = [
    {
        "ticker": "AAPL",
        "name": "Apple Inc",
        "c": 172.62,
        "d": -0.38,
        "dp": -0.2197,
        "color": "text-danger"
    },
    {
        "name": "Dell Technologies Inc",
        "ticker": "DELL",
        "c": 107,
        "d": 0.55,
        "dp": 0.5167,
        "color": "text-success"
    },
    {
        "ticker": "No Change",
        "name": "Apple Inc",
        "c": 172.62,
        "d": 0,
        "dp": -0.2197,
        "color": "text-dark"
    },
];
exports.sample_portfolio = {
    "balance": 25000.00,
    "portfolioItem": [
        {
            "name": "Apple Inc",
            "ticker": "AAPL",
            "c": 172.62,
            "quantity": 3.00,
            "totalCost": 552.69,
            "color": "text-danger"
        },
        {
            "name": "Dell Technologies Inc",
            "ticker": "DELL",
            "c": 107,
            "quantity": 3.00,
            "totalCost": 2331.34,
            "color": "text-success"
        },
        {
            "ticker": "No Change",
            "name": "Apple Inc",
            "c": 172.62,
            "quantity": 3.00,
            "totalCost": 2331.34,
            "color": "text-dark"
        },
    ]
};
