interface ProfileItem {
    country: string;
    currency: string;
    estimateCurrency: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    marketCapitalization: number;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
}

interface ProfileResult{
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
}

export const formatProfile = (data: ProfileItem ): ProfileResult => {
    const result: ProfileResult = {
        ticker: data.ticker,
        name: data.name,
        exchange: data.exchange,
        ipo: data.ipo,
        logo: data.logo,
        weburl: data.weburl,
        finnhubIndustry: data.finnhubIndustry,
    };

    return result;
}