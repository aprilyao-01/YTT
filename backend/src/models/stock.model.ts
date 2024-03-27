import { Schema, model } from "mongoose";

export interface Stock {
    // from profile2
    ticker: string;
    name: string;
    exchange: string;
    ipo: string;
    logo: string;
    weburl: string;
    finnhubIndustry: string;
    // from quote
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
    // from peers
    peers: string[];
    // decide by function
    color: string;
}

export const StockSchema = new Schema<Stock>(
    {
        ticker: {type: String, required: true},
        name: {type: String, required: true},
        exchange: {type: String, required: true},
        ipo: {type: String, required: true},
        // marketCapitalization: {type: Number, required: true},
        logo: {type: String, required: true},
        weburl: {type: String, required: true},
        finnhubIndustry: {type: String, required: true},
        c: {type: Number, required: true},
        d: {type: Number, required: true},
        dp: {type: Number, required: true},
        h: {type: Number, required: true},
        l: {type: Number, required: true},
        o: {type: Number, required: true},
        pc: {type: Number, required: true},
        t: {type: Number, required: true},
        peers: {type: [String], required: true},
        color: {type: String, required: false}
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