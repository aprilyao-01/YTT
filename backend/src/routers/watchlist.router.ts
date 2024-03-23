import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asynceHandler from 'express-async-handler';
import { WatchlistModel } from '../models/watchlist.model';
import { sample_watchlist } from '../data';

const router = Router();

router.get('/seed', asynceHandler(
    async (req, res) => {
        const watchItemCount = await WatchlistModel.countDocuments();
        if(watchItemCount>0){
            res.send({message: 'Watchlist already seeded'});
            return
        }
        await WatchlistModel.create(sample_watchlist);
        res.send({message: 'Watchlist seeded'});
    }
))

router.get('/', (req, res) => {
    res.send({message: 'Watchlist router'});
})


export default router;