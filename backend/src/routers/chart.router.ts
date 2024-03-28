import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/lastworking/:ticker/:from/:to', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
        const from = req.params.from.trim();
        const to = req.params.to.trim();

        axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/hour/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_TOKEN}`, {
        }).then(data => {
            res.send(data.data.results);
        }).catch(err => {
            res.send({error: err});
        });
    }
));

// data of the last 2 years.
router.get('/history/:ticker/:from/:to', asyncHandler(
    async (req, res) => {
        const ticker = req.params.ticker.trim().toUpperCase();
        const from = req.params.from.trim();
        const to = req.params.to.trim();

        axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_TOKEN}`, {
        }).then(data => {
            res.send(data.data.results);
        }).catch(err => {
            res.send({error: err});
        });
    }
));

export default router;