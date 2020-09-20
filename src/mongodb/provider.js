import mongoose from 'mongoose';

import { isProduction } from '../config.js';

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (!isProduction) {
            mongoose.set('debug', true);
        }

        console.info('Mongoose Connection successfully opened!');
    } catch (err) {
        console.error(err);
    }
})();
