import express, { urlencoded, json } from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';

import assignmentRoutes from './routes/assignment';
import boardRoutes from './routes/board';
import testProtocolRoutes from './routes/testProtocol';
import textFileRoutes from './routes/textFile';

const app = express();

// settings
app.set('port', config.port);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use('/api', assignmentRoutes);
app.use('/api', boardRoutes);
app.use('/api', testProtocolRoutes);
app.use('/api', textFileRoutes);

export default app;
