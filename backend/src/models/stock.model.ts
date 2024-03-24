import { Schema, model } from "mongoose";

export interface Stock {
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    marketCapitalization: number;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
}

export const StockSchema = new Schema<Stock>(
    {
        ticker: {type: String, required: true},
        name: {type: String, required: true},
        exchange: {type: String, required: true},
        ipo: {type: String, required: true},
        marketCapitalization: {type: Number, required: true},
        logo: {type: String, required: true},
        weburl: {type: String, required: true},
        finnhubIndustry: {type: String, required: true}
    },{
        // get from db and work on it
        toObject: {     
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

export const StockModel = model<Stock>('stock', StockSchema);