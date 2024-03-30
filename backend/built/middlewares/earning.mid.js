"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEarning = void 0;
var formatEarning = function (data) {
    // init the result
    var result = data.data;
    result.forEach(function (item) {
        if (item.actual == null) {
            item.actual = 0;
        }
        if (item.estimate == null) {
            item.estimate = 0;
        }
        if (item.surprise == null) {
            item.surprise = 0;
        }
        if (item.surprisePercent == null) {
            item.surprisePercent = 0;
        }
    });
    return result;
};
exports.formatEarning = formatEarning;
