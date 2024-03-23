import { Schema, model } from "mongoose";

export interface PortfolioItem {
    ticker: string;
    name: string;
    quantity: number;
    average: number;
    totalCost: number;
    change: number;
    c: number;
    marketValue: number;
    color: string;
}

export interface Portfolio extends Document {
    balance: number;
    portfolioItem: PortfolioItem[];
}

export const PortfolioSchema = new Schema<Portfolio>(
    {
        balance: {type: Number, default: 25000.00, required: true},
        portfolioItem: [{
            ticker: {type: String, required: true},
            name: {type: String, required: true},
            quantity: {type: Number, default: 0, required: true},
            average: {type: Number, default: 0, required: true},
            totalCost: {type: Number, default: 0, required: true},
            change: {type: Number, default: 0, required: true},
            c: {type: Number, required: true},
            marketValue: {type: Number, default: 0, required: true},
            color: {type: String, required: false}
        }]
    },{
        toObject: {
            virtuals: true
        }
    }
)

export const PortfolioModel = model<Portfolio>('portfolio', PortfolioSchema);