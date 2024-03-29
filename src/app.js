import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes';

import joiErrors from './middlewares/validationErrors';

import './helpers/events';


const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
  })
);

app.use('/', routes);

app.use(joiErrors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err.status,
  });
  next();
});

// app.listen(process.env.PORT);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
export default app;
