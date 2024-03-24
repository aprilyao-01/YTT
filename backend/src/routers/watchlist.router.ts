import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import asynceHandler from 'express-async-handler';
import { WatchItemModel } from '../models/watchlist.model';
import { sample_watchItems, sample_watchlist } from '../data';

const router = Router();

router.get('/seedItem', asynceHandler(
    async (req, res) => {
        const watchItemCount = await WatchItemModel.countDocuments();
        if(watchItemCount>0){
            res.send({message: 'Watchlist already seeded'});
            return
        }
        await WatchItemModel.create(sample_watchItems);
        res.send({message: 'Watchlist seeded'});
    }
))

// router.get('/seed', asynceHandler(
//     async (req, res) => {
//         const watchItemCount = await WatchlistModel.countDocuments();
//         if(watchItemCount>0){
//             res.send({message: 'Watchlist already seeded'});
//             return
//         }
//         await WatchlistModel.create(sample_watchlist);
//         res.send({message: 'Watchlist seeded'});
//     }
// ))

// router.get('/api/watchlist', asynceHandler(
//     async (req, res) => {
//         // get all watchlist items
//         const watchlist = await WatchlistModel.find();
//         console.log("request to /watchlist in db");
//         res.send(watchlist);
//     }
// ))

router.get('/', asynceHandler(
    async (req, res) => {
        // get all watchlist items
        const watchlist = await WatchItemModel.find();
        console.log("request to /watchitem in db");
        res.send(watchlist);
    }
))


export default router;