// use env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { sample_portfolio, sample_stock, sample_watchlist } from './data';
import searchRouter from './routers/stock.router';
import watchlistRouter from './routers/watchlist.router';
import portfolioRouter from './routers/portfolio.router';

// connect to MongoDB
import { dbConnect } from './configs/db.config';
dbConnect();

// setup express
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

app.use("/search", searchRouter);
app.use('/watchlist', watchlistRouter);
app.use('/portfolio', portfolioRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// setup routes
app.get('/sample/all', (req, res) => {
    res.send(sample_stock);
});

app.get('/sample/single', (req, res) => {
    res.send(sample_stock[0]);
});

// TODO: Add route according to frontend xxx.service.ts
