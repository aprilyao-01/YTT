import express from 'express';
import cors from 'cors';
import { sample_stock } from './data';


// setup express
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// setup routes
app.get('/api/sample', (req, res) => {
    res.send(sample_stock);
});

// TODO: Add route according to frontend xxx.service.ts
app.get('/api/search/:ticker', (req, res) => {
    const ticker = req.params.ticker;
    const stock = sample_stock.find(stock => stock.ticker === ticker.toUpperCase()) ?? {};
    res.send(stock);
});