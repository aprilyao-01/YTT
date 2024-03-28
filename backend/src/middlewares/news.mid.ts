interface NewsItem {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

interface NewsResult {
    datetime: string;
    headline: string;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

const isValidNews = (item: NewsItem): boolean => {
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
}

export const formatNews = (data: { data: NewsItem[]}) => {
    // init the result
    const result: NewsResult[] = [];
    var count = 0;      // show 20 news items

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    for (var i = 0; i < data.data.length && count < 20 ; i++) {
        if(isValidNews(data.data[i])) {
            const date = new Date(data.data[i].datetime * 1000);
            const year = date.getFullYear();
            const month = monthNames[date.getMonth()];
            const day = date.getDate();
            const datetime = `${month} ${day}, ${year}`;

            const newsItem: NewsResult = {
                datetime: datetime,
                headline: data.data[i].headline,
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
}

export function formatDate(date: Date) {
    const year = date.getFullYear();
    // pad the month and day with leading zeros
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}