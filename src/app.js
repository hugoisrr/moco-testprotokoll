import express, { urlencoded, json } from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import { url } from 'inspector';

const app = express();

// settings
app.set('port', config.port);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

export default app;
