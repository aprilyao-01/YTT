export interface Profile {
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
}

export interface CurrentPrice {
    c: string;
    d: string;
    dp: string;
    h: string;
    l: string;
    o: string;
    pc: string;
    t: string;
    color: string;
}

export class Stock {
    // https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=
    country?: string;
    currency?: string;
    estimateCurrency?: string;
    exchange!: string;
    ipo!: string;
    marketCapitalization?: number;
    name!: string;
    phone?: string;
    shareOutstanding?: number;
    ticker!: string;
    weburl!: string;
    logo!: string;
    finnhubIndustry!:string;
    // https://finnhub.io/api/v1/quote?symbol=AAPL&token=
    c!: number;     // current price
    d!: number;
    dp!: number;
    h!: number;
    l!: number;
    o!: number;
    pc!: number;
    t!: number;
    // https://finnhub.io/api/v1/stock/peers?symbol=AAPL&token=
    peers!: string[];
    // for portfolio
    quantity!: number;
    totalCost!: number;
    // ave = total / quantity
    // current = c
    // change = ave - c
    // marketV = c * qty
    color?: string;
}

export class StockV2 {
    profile!: Profile;
    currentPrice!: CurrentPrice;
    peers!: string[];
    quantity?: number = 0;
    totalCost?: number = 0;
}