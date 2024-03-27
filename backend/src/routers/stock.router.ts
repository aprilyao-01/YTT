import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { formatInsider } from '../middlewares/insider.mid';
import { formatEarning } from '../middlewares/earning.mid';
import { formatDate, formatNews } from '../middlewares/news.mid';
import { formatSearch} from '../middlewares/autocomplete.mid';
import { formatProfile } from '../middlewares/profile.mid';

const router = Router();

// autocomplete
router.get("/autocomplete/:ticker", asyncHandler(
    async (req, res) => {
        var ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/search', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                q: ticker
            }
        }).then(data => {
            res.send(formatSearch(data));
        }).catch(err => {
            res.send({error: err});
        })
    }
));

// profile
router.get('/profile/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/profile2', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(data => {
            res.send(formatProfile(data.data));
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// quote
router.get('/quote/:ticker', asyncHandler(
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
router.get('/peers/:ticker', asyncHandler(
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
router.get('/news/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        var end = new Date(Date.now());
        var start = new Date(end);
        start.setDate(start.getDate() - 7);     // 1 week before the current date
    
        axios.get('https://finnhub.io/api/v1/company-news', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker,
                from: formatDate(start),
                to: formatDate(end),
            }
        }).then(data => {
            res.send(formatNews(data));
        }).catch(err => {
            res.send({error: err});
        });
    }
));


// recommendation
router.get('/recommendation/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/recommendation', {
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

// insider sentiment
router.get('/insider/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/insider-sentiment', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker,
                from: '2022-01-01'
            }
        }).then(data => {
            res.send(formatInsider(data.data));
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// earnings
router.get('/earnings/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
    
        axios.get('https://finnhub.io/api/v1/stock/earnings', {
            params: {
                token: process.env.FINNHUB_TOKEN,
                symbol: ticker
            }
        }).then(data => {
            res.send(formatEarning(data));
        }).catch(err => {
            res.send({error: err});
        });
    }
));


export default router;