// use env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { sample_portfolio, sample_stock, sample_watchlist } from './data';
import axios from 'axios';
import searchRouter from './routers/stock.router';

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

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// set up Finnhub API
const finnhub_token = "cmq5s09r01ql684s0ra0cmq5s09r01ql684s0rag";

// setup routes
app.get('/sample/all', (req, res) => {
    res.send(sample_stock);
});

app.get('/sample/single', (req, res) => {
    res.send(sample_stock[0]);
});

// TODO: Add route according to frontend xxx.service.ts
app.get('/watchlist', (req, res) => {
    res.send(sample_watchlist);
})

app.get('/portfolio', (req, res) => {
    res.send(sample_portfolio);
})