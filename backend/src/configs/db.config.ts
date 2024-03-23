import dotenv from 'dotenv';
dotenv.config();

import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URL!, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => { console.log('Connected to MongoDB');},
        (err) => console.error('Failed to connect to MongoDB', err)
    )
}