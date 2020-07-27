import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes/index';
import uploadoConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadoConfig.directory));
app.use(routes);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});
app.listen(3333, () => {
  console.log('Aplicacao rodando na porta 3333');
});
