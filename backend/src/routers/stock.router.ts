import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asynceHandler from 'express-async-handler';
import { StockModel } from '../models/stock.model';
import { sample_stock } from '../data';

const router = Router();

// router.get('/seed', asynceHandler(
//     async (req, res) => {
//         const stockCount = await StockModel.countDocuments();
//         if(stockCount>0){
//             res.send({message: 'Stock already seeded'});
//             return
//         }
//         await StockModel.create(sample_stock);
//         res.send({message: 'Stock seeded'});
//     }
// ));

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