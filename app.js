const express = require('express');
const { repairsRouter } = require('./routes/repairs.route');
const { usersRouter } = require('./routes/users.route');
const { globalErrorHandler } = require('./controllers/error.controller');
const { rateLimit } = require('express-rate-limit');

const app = express();

app.use(express.json());

//Rate limit

const limiter = rateLimit({
    max: 5,
    windowMs: 10 * 1000,
    message: 'Too many request'
})

app.use(limiter);

//ROUTES

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

//Global error handler
app.use('*', globalErrorHandler);


module.exports = { app }