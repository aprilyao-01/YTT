// use env file
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import searchRouter from './routers/stock.router';
import watchlistRouter from './routers/watchlist.router';
import portfolioRouter from './routers/portfolio.router';
import chartRouter from './routers/chart.router';

// connect to MongoDB
import { dbConnect } from './configs/db.config';
dbConnect();

// setup express
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));
app.use(express.json());

// setup routes
app.use("/api", searchRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/chart', chartRouter);

// get current time
app.get('/', asyncHandler(async (req, res) => {
    let ts = new Date(Date.now());
    ts.setDate(ts.getDate() - 2);
    ts.setHours(ts.getHours() - 6);
    
    let last = new Date();
    last.setHours(ts.getHours() - 6);
    
    // Send the response with typed data
    res.send({ str: String(ts), num: Number(ts), last: Number(last) });
}));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});