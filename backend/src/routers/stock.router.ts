import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asynceHandler from 'express-async-handler';
import { StockModel } from '../models/stock.model';
import { IFinnhubSearchResponse, IFinnhubSearchResult } from '../interfaces/IFinnhubSearch';

const router = Router();

// profile
router.get('/profile/:ticker', asynceHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/profile2', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(data => {
            res.send(data.data);
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// quote
router.get('/quote/:ticker', asynceHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/quote', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(data => {
            res.send(data.data);
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// peers
router.get('/peers/:ticker', asynceHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/peers', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(data => {
            res.send(data.data);
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// news
router.get('/news/:ticker', asynceHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        var end = new Date(Date.now());
        var start = new Date(end);
        start.setDate(start.getDate() - 7);
    
        axios.get('https://finnhub.io/api/v1/company-news', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker,
                from: `${start.getFullYear()}-${start.getMonth()}-${start.getDay()}`,
                to: `${end.getFullYear()}-${end.getMonth()}-${end.getDay()}`,
            }
        }).then(data => {
            res.send(data.data);
        }).catch(err => {
            res.send({error: err});
        });
    }
));


// autocomplete
router.get("/autocomplete/:ticker", asynceHandler(
    async (req, res) => {
        var ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get<IFinnhubSearchResponse>('https://finnhub.io/api/v1/search', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                q: ticker
            }
        }).then(data => {
            let result = data.data.result;
            result = result.filter((feed: IFinnhubSearchResult) => {
                if (feed.type === null || feed.symbol == null || feed.symbol.indexOf('.') !== -1) {
                    return false;
                }
                return feed.type == "Common Stock";
            });
            result.forEach((element: Partial<IFinnhubSearchResult>) => {
                delete element.type;
                delete element.primary;
            });
            console.log("from api: " + result);
            res.send(result);
        }).catch(err => {
            res.send({error: err});
        })
    }
));


export default router;