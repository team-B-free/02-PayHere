import express from 'express';
import { ValidationError } from 'express-validation';
import routes from './routes/index.js';
import { joiErrorHandler } from './middlewares/joiErrorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);
/* eslint-disable */
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return joiErrorHandler(err, res);
  }
});

export default app;
