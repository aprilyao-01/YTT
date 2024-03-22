import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';

const router = Router();

router.get('/:ticker', (req, res) => {
    const ticker = req.params.ticker.trim().toUpperCase();
    // const stock = sample_stock.find(stock => stock.ticker === ticker.toUpperCase()) ?? {};
    // res.send(stock);

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
});


export default router;