const express = require('express');
const { repairsRouter } = require('./routes/repairs.route');
const { usersRouter } = require('./routes/users.route');

const app = express();

app.use(express.json());

//ROUTES

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);


module.exports = { app }