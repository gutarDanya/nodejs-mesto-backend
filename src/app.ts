import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import authRouter from './routes/authorization';
import errorsMW from './middlewares/errorsMW';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

require('dotenv').config();
const cookieParser = require('cookie-parser');

mongoose.set('strictQuery', true);
const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения:', err));

app.use(requestLogger);
app.use('/', authRouter);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorsMW);
app.listen(PORT, () => {
  console.log(`я работаю на порту ${PORT}`);
});
