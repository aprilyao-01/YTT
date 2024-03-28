import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/summary/:ticker', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
        // https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{from_date}/{to_date}?adjusted=true&sort=asc&apiKey={polygon_api_key}

        axios.get('https://api.polygon.io/v2/aggs/ticker/', {
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

export default router;