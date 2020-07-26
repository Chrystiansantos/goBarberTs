import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import uploadoConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadoConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Aplicacao rodando na porta 3333');
});
