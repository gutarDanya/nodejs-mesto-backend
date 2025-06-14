import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user'

const { PORT = 3000 } = process.env
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch(err => console.error('Ошибка подключения:', err));


app.use('/users', userRouter)
app.listen(PORT, () => {
  console.log(`я работаю на порту ${PORT}`)
})