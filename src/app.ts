import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
app.use(express.json());
app.use(cors());

//route paths | http://localhost:5000/api | initial api structure
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blogging Platform!');
});

app.use(globalErrorHandler);
//@ts-ignore
app.use(notFound);
export default app;
