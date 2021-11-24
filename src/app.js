import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import tokenMiddleware from './middleware/authenticantion.js';
import connection from './database.js';

import userController from './controllers/userController.js';
import financialController from './controllers/financialController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signUp);

app.post('/sign-in', userController.signIn);

app.use(tokenMiddleware);
app.get('/financial-events', financialController.getFinancialEvents);
app.post('/financial-events', financialController.postFinancialEvent);
app.get('/financial-events/sum', financialController.getSum);

export default app;
