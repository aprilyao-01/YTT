export class Stock {
    // https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=cmq5s09r01ql684s0ra0cmq5s09r01ql684s0rag
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
    // https://finnhub.io/api/v1/quote?symbol=AAPL&token=cmq5s09r01ql684s0ra0cmq5s09r01ql684s0rag
    c!: number;     // current price
    d!: number;
    dp!: number;
    h!: number;
    l!: number;
    o!: number;
    pc!: number;
    t!: number;
    // https://finnhub.io/api/v1/stock/peers?symbol=AAPL&token=cmq5s09r01ql684s0ra0cmq5s09r01ql684s0rag
    peers!: string[];
    // for portfolio
    quantity!: number;
    totalCost!: number;
    // ave = total / quantity
    // current = c
    // change = ave - c
    // marketV = c * qty
}