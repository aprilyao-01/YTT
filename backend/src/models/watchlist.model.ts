import { Schema, model } from "mongoose";

export interface WatchItem {
    ticker: string;
    name: string;
    c: number;
    d: number;
    dp: number;
    color: string;
}

export const WatchItemSchema = new Schema<WatchItem>(
    {
        ticker: {type: String, required: true},
        name: {type: String, required: true},
        c: {type: Number, required: true},
        d: {type: Number, required: true},
        dp: {type: Number, required: true},
        color: {type: String, required: false}
    },{
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)


export const WatchItemModel = model<WatchItem>('watchItem', WatchItemSchema);