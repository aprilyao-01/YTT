import dotenv from 'dotenv';
dotenv.config();

import {Router} from 'express';
import axios from 'axios';
import asynceHandler from 'express-async-handler';
import { PortfolioModel } from '../models/portfolio.model';
import { sample_portfolio } from '../data';

const router = Router();

router.get('/seed', asynceHandler(
    async (req, res) => {
        const portfolioItemCount = await PortfolioModel.countDocuments();
        if(portfolioItemCount>0){
            res.send({message: 'Portfolio already seeded'});
            return
        }
        await PortfolioModel.create(sample_portfolio);
        res.send({message: 'Portfolio seeded'});
    }
))

router.get('/', (req, res) => {
    res.send({message: 'Portfolio router'});
})


export default router;