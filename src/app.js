import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { logErrorsDev, logErrosProduction } from './errorlog.js';
import characterRoutes from './routes/characters.js';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

/* Swagger Docs!  */
const swaggerDocs = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cortex D&D API', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: ['./src/routes/*.js'],
});

try {
    mongoose.connect(process.env.DATABASE_URI || 'mongodb://localhost/dndapi', {
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (!isProduction) {
    app.use(logErrorsDev);
} else {
    app.use(logErrosProduction);
}

app.get('/', (req, res) => res.send(`<h1>Welcome</h1>
<h2> Please view <a href="/api-docs">Docs</a> for more info! </h2> `));

const server = app.listen(3000, () => {
    console.log(`Starting Server on Port:${server.address().port}`);
});
