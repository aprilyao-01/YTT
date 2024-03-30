import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { BalanceModel, PortfolioItemModel } from '../models/portfolio.model';
import { sample_portfolio } from '../data';

const router = Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const portfolioItemCount = await PortfolioItemModel.countDocuments();
        // const portfolioItemCount = await PortfolioModel.countDocuments();
        if(portfolioItemCount>0){
            res.send({message: 'PortfolioItem already seeded'});
            return
        }
        await PortfolioItemModel.create(sample_portfolio.portfolioItem);
        await BalanceModel.create({ balance: 250000.00 });
        res.send({message: 'PortfolioItem seeded'});
    }
))

router.get('/', asyncHandler(
    async (req, res) => {
        const portfolioItem = await PortfolioItemModel.find();


        const balance = await BalanceModel.findOne();
        if (!balance) {
            res.send({ balance: 25000.00, portfolioItem: portfolioItem });
            return;
        } else {
            res.send({ balance: balance.balance, portfolioItem: portfolioItem });
        }
        console.log("request to /portfolio in db");
       
    }
))

router.post('/update', asyncHandler(
    async (req, res) => {
        await PortfolioItemModel.deleteMany({});
        await PortfolioItemModel.insertMany(req.body.portfolioItem);
        await BalanceModel.deleteMany({});
        await BalanceModel.create({ balance: req.body.balance });
        
        res.send( {message: 'Portfolio updated'});
    }
))


export default router;