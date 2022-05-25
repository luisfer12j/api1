const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

//Controllers
const { globalErrorHandler } = require('./controllers/error.controller');
//Routers
const { repairsRouter } = require('./routes/repairs.route');
const { usersRouter } = require('./routes/users.route');

//Init express app
const app = express();

//Enable CORS
app.use(cors());

//Enable incomming JSON data
app.use(express.json());

//Add security headers
app.use(helmet());

//Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

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