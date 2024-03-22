import { Schema, model } from "mongoose";

export interface WatchItem {
    ticker: string;
    name: string;
    c: number;
    d: number;
    dp: number;
    color: string;
}

interface Watchlist extends Document {
    watchItem: WatchItem[];
}

export const WatchlistSchema = new Schema<Watchlist>(
   {
        watchItem: [{
            ticker: {type: String, required: true},
            name: {type: String, required: true},
            c: {type: Number, required: true},
            d: {type: Number, required: true},
            dp: {type: Number, required: true},
            color: {type: String, required: false}
        }]
   },{
       toObject: {
           virtuals: true
       }
   }
)

export const WatchlistModel = model<Watchlist>('watchlist', WatchlistSchema);