"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSearch = void 0;
// data is searchData, any for skipping type checking
var formatSearch = function (data) {
    // init the result
    var res = data.data.result;
    var result = [];
    res = res.filter(function (feed) {
        if (feed.type == null || feed.symbol == null || feed.symbol.indexOf('.') !== -1) {
            return false;
        }
        return feed.type == "Common Stock";
    });
    res.forEach(function (element) {
        result.push({
            symbol: element.symbol,
            description: element.description
        });
    });
    return result;
};
exports.formatSearch = formatSearch;
