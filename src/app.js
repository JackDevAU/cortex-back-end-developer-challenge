import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';

import { logErrorsDev, logErrosProduction } from './errorlog.js';
import characterRoutes from './routes/characters.js';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

try {
    mongoose.connect(process.env.DATABASE || 'mongodb://mongo/dndapi', {
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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/characters', characterRoutes);

if (!isProduction) {
    app.use(logErrorsDev);
} else {
    app.use(logErrosProduction);
}

app.get('/', (req, res) => res.send('Welcome to a API? maybe? '));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Starting Server on http://localhost:${server.address().port}`);
});
