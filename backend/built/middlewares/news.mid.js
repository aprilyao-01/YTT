"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.formatNews = void 0;
var isValidNews = function (item) {
    if (item.datetime === undefined || item.datetime === 0) {
        return false;
    }
    if (item.headline === undefined || item.headline.length === 0) {
        return false;
    }
    if (item.image === undefined || item.image.length === 0) {
        return false;
    }
    if (item.url === undefined || item.url.length === 0) {
        return false;
    }
    return true;
};
var formatNews = function (data) {
    // init the result
    var result = [];
    var count = 0; // show 20 news items
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    for (var i = 0; i < data.data.length && count < 20; i++) {
        if (isValidNews(data.data[i])) {
            var date = new Date(data.data[i].datetime * 1000);
            var year = date.getFullYear();
            var month = monthNames[date.getMonth()];
            var day = date.getDate();
            var datetime = "".concat(month, " ").concat(day, ", ").concat(year);
            var newsItem = {
                datetime: datetime,
                headline: data.data[i].headline,
                id: data.data[i].id,
                image: data.data[i].image,
                related: data.data[i].related,
                source: data.data[i].source,
                summary: data.data[i].summary,
                url: data.data[i].url
            };
            result.push(newsItem);
            count++;
        }
    }
    return result;
};
exports.formatNews = formatNews;
function formatDate(date) {
    var year = date.getFullYear();
    // pad the month and day with leading zeros
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
exports.formatDate = formatDate;
