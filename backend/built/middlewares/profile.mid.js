"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProfile = void 0;
var formatProfile = function (data) {
    var result = {
        ticker: data.ticker,
        name: data.name,
        exchange: data.exchange,
        ipo: data.ipo,
        logo: data.logo,
        weburl: data.weburl,
        finnhubIndustry: data.finnhubIndustry,
    };
    return result;
};
exports.formatProfile = formatProfile;
