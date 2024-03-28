import { Portfolio } from "./app/shared/models/Portfolio";
import { News, Stock, StockV2 } from "./app/shared/models/Stock";
import { WatchlistItem } from "./app/shared/models/WatchlistItem";

export const sample_stock: Stock[] = 
[
  {
    "country":"US",
    "currency":"USD",
    "estimateCurrency":"USD",
    "exchange":"NASDAQ NMS - GLOBAL MARKET",
    "finnhubIndustry":"Technology",
    "ipo":"1980-12-12",
    "logo":"https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg",
    "marketCapitalization":2665577.398546,
    "name":"Apple Inc",
    "phone":"14089961010",
    "shareOutstanding":15441.88,
    "ticker":"AAPL",
    "weburl":"https://www.apple.com/",
    "c":172.62,
    "d":-0.38,
    "dp":-0.2197,
    "h":172.62,
    "l":170.29,
    "o":171,
    "pc":173,
    "t":1710532802,
    "peers": ["AAPL","DELL","SMCI","HPQ","1337.HK","HPE","NTAP","WDC","PSTG","XRX"],
    "quantity": 3.00,
    "totalCost": 552.69
  },
  {
    "country":"US",
    "currency":"USD",
    "estimateCurrency":"USD",
    "exchange":"NEW YORK STOCK EXCHANGE, INC.",
    "finnhubIndustry":"Technology",
    "ipo":"2016-08-01",
    "logo":"https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/DELL.svg",
    "marketCapitalization":78475.46325685747,
    "name":"Dell Technologies Inc",
    "phone":"18002893355",
    "shareOutstanding":706.34,
    "ticker":"DELL",
    "weburl":"https://www.delltechnologies.com/",
    "c":107,
    "d":0.55,
    "dp":0.5167,
    "h":108.98,
    "l":105.64,
    "o":107.044,
    "pc":106.45,
    "t":1710460800,
    "peers": ["AAPL","DELL","SMCI","HPQ","1337.HK","HPE","NTAP","WDC","PSTG","XRX"],
    "quantity": 3.00,
    "totalCost": 2331.34
  },

  {
    "country":"US",
    "currency":"USD",
    "estimateCurrency":"USD",
    "exchange":"NASDAQ NMS - GLOBAL MARKET",
    "finnhubIndustry":"Technology",
    "ipo":"1980-12-12",
    "logo":"https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg",
    "marketCapitalization":2665577.398546,
    "name":"ERROR",
    "phone":"14089961010",
    "shareOutstanding":15441.88,
    "ticker":"error",
    "weburl":"https://www.apple.com/",
    "c":172.62,
    "d":-0.38,
    "dp":-0.2197,
    "h":172.62,
    "l":170.29,
    "o":171,
    "pc":173,
    "t":1710532802,
    "peers": ["AAPL","DELL","SMCI","HPQ","1337.HK","HPE","NTAP","WDC","PSTG","XRX"],
    "quantity": 3.00,
    "totalCost": 552.69
  },
]

export const sample_watchlist: WatchlistItem[] = 
[
  {
    "ticker":"AAPL",
    "name":"Apple Inc",
    "c":172.62,
    "d":-0.38,
    "dp":-0.2197,
    "color":"text-danger"
  },
  {
    "name":"Dell Technologies Inc",
    "ticker":"DELL",
    "c":107,
    "d":0.55,
    "dp":0.5167,
    "color":"text-success"
  },
  {
    "ticker":"No Change",
    "name":"Apple Inc",
    "c":172.62,
    "d":0,
    "dp":-0.2197,
    "color":"text-dark"
  },
]

export const sample_portfolio: Portfolio = 
{
  "balance": 25000.00,
  "portfolioItem": 
  [
    {
      "name":"Apple Inc",
      "ticker":"AAPL",
      "c":172.62,
      "quantity": 3.00,
      "totalCost": 552.69,
      "color":"text-danger"
    },
    {
      "name":"Dell Technologies Inc",
      "ticker":"DELL",
      "c":107,
      "quantity": 3.00,
      "totalCost": 2331.34,
      "color":"text-success"
    },
    {
      "ticker":"No Change",
      "name":"Apple Inc",
      "c":172.62,
      "quantity": 3.00,
      "totalCost": 2331.34,
      "color":"text-dark"
    },
  ]
}

// export const sample_stockV2:StockV2 =
// {
//   "profile": {
//     "exchange": "",
//     "finnhubIndustry": "",
//     "ipo": "",
//     "logo": "",
//     "name": "",
//     "ticker": "home",
//     "weburl": ""
//   },
//   "currentPrice": {
//     "c": 0,
//     "d": "",
//     "dp": "",
//     "h": "",
//     "l": "",
//     "o": "",
//     "pc": "",
//     "t": "",
//     "color": ""
//   },
//   "peers": [],
//   "quantity": 0,
//   "totalCost": 0
// }

export const sample_news: News =
{
  "datetime": "March 26, 2024",
  "headline": "Wall Street Breakfast Podcast: Bridge Collapse Disrupts Coal Operations",
  "image": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/96390221/image_96390221.jpg?io=getty-c-w1536",
  "related": "AAPL",
  "source": "SeekingAlpha",
  "summary": "Consol Energy slips 7% as Maryland marine terminal likely faces long downtime. GameStop slides after reporting weak sales tally for holiday quarter. Apple confirms developer conference.",
  "url": "https://finnhub.io/api/news?id=7540647ebf5e6cdf2c08118c47a9de2147b772361c798df621a3dab15f22a905"
}