interface searchDataItem{
    description: string;
    displaySymbol: string;
    primary: string[];
    symbol: string;
    type: string;
}

interface searchData{
    count: number;
    data: searchDataItem[];
}

interface searchResult {
    symbol: string;
    description: string;
}

// data is searchData, any for skipping type checking
export const formatSearch = (data: any): searchResult[] => {
    // init the result
    let res: searchDataItem[] = data.data.result;
    const result: searchResult[] = [];

    res = res.filter(feed => {
        if (feed.type == null || feed.symbol == null || feed.symbol.indexOf('.') !== -1) {
            return false;
        }
        return feed.type == "Common Stock";
    });

    res.forEach(element => {
        result.push({
            symbol: element.symbol,
            description: element.description
        });
    });

    return result;
}