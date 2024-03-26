interface EarningItem {
    actual: number;
    estimate: number;
    period: string;
    quarter: number;
    surprise: number;
    surprisePercent: number;
    symbol: string;
    year: number;
}

export const formatEarning = (data: { data: EarningItem[]}) => {
    // init the result
    const result: EarningItem[] = data.data;

    result.forEach(item => {
        if (item.actual == null) {
            item.actual = 0
        }
        if (item.estimate == null) {
            item.estimate = 0
        }
        if (item.surprise == null) {
            item.surprise = 0
        }
        if (item.surprisePercent == null) {
            item.surprisePercent = 0 
        }
    });

    return result;
}