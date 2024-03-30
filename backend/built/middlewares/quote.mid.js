"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatQuote = void 0;
function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
var formatQuote = function (quote) {
    var result = {
        c: quote.c,
        d: quote.d,
        dp: quote.dp,
        h: quote.h,
        l: quote.l,
        o: quote.o,
        pc: quote.pc,
        t: quote.t,
        color: '',
        markOpen: true,
        getQuoteTimestamp: '',
        lastTimestamp: '',
    };
    if (quote.d > 0) {
        result.color = 'text-success';
    }
    else if (quote.d < 0) {
        result.color = 'text-danger';
    }
    else { // d == 0
        result.color = 'text-dark';
    }
    result.getQuoteTimestamp = formatDate(new Date());
    var date = new Date(quote.t * 1000);
    result.lastTimestamp = formatDate(date);
    var currentTimestamp = Math.floor(Date.now() / 1000);
    // Assume the market is closed if more than 5 minutes has elapsed from this ‘t’ value.
    // Assume the market is open, if otherwise.
    if (currentTimestamp - quote.t < 300) {
        result.markOpen = true;
    }
    else {
        result.markOpen = false;
    }
    return result;
};
exports.formatQuote = formatQuote;
