const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

//middlewares
if ((process.env.NODE_ENV = 'Development')) {
  app.use(morgan('dev'));
}

// app.use((req, res, next) => {
//   console.log('hello from the middleware');
//   next();
// });

//routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//start server

module.exports = app;
