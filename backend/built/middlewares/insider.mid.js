"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInsider = void 0;
var formatInsider = function (data) {
    // init the result
    var result = {
        symbol: data.symbol,
        change: {
            total: 0,
            positiveVal: 0,
            negativeVal: 0,
        },
        mspr: {
            total: 0,
            positiveVal: 0,
            negativeVal: 0,
        },
    };
    // process each data item
    data.data.forEach(function (item) {
        // accumulate the total/positive/negative change values
        result.change.total += item.change;
        if (item.change > 0)
            result.change.positiveVal += item.change;
        else if (item.change < 0)
            result.change.negativeVal += item.change;
        // accumulate the total/positive/negative mspr values
        result.mspr.total += item.mspr;
        if (item.mspr > 0)
            result.mspr.positiveVal += item.mspr;
        else if (item.mspr < 0)
            result.mspr.negativeVal += item.mspr;
    });
    return result;
};
exports.formatInsider = formatInsider;
