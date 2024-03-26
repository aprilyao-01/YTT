import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { WatchItemModel } from '../models/watchlist.model';
import { sample_watchItems } from '../data';

const router = Router();

router.get('/seed', asyncHandler(
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

router.get('/', asyncHandler(
    async (req, res) => {
        // get all watchlist items
        const watchlist = await WatchItemModel.find();
        console.log("request to /watchitem in db");
        res.send(watchlist);
    }
))

router.post('/update', asyncHandler(
    async (req, res) => {
        // clear existing and insert new
        // await WatchItemModel.deleteMany({});
        // const updatedWatchlist = await WatchItemModel.insertMany(req.body);
        
        // res.send(updatedWatchlist);
    }
))

export default router;