interface Profile {
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
}

interface CurrentPrice {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
    color: string;
    markOpen: boolean;
    getQuoteTimestamp: string;
    lastTimestamp: string;
}

export interface News{
    datetime: string;
    headline: string;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
    id: number;
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
    news!: News[];
    quantity!: number;
    totalCost!: number;

    constructor(
        profile: Profile = {ticker: '', name: '', exchange: '', ipo: '', logo: '', weburl: '', finnhubIndustry: ''},
        currentPrice: CurrentPrice = {c: 0, d: 0, dp: 0, h: 0, l: 0, o: 0, pc: 0, t: 0, color: '', markOpen: true, getQuoteTimestamp:'', lastTimestamp: ''},
        peers: string[] = [],
        news: News[] = [],
        quantity: number = 0,
        totalCost: number = 0
    ) {
        this.profile = profile;
        this.currentPrice = currentPrice;
        this.peers = peers;
        this.news = news;
        this.quantity = quantity;
        this.totalCost = totalCost;
    }
}