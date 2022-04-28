const express = require('express');
const { repairsRouter } = require('./routes/repairs.route');
const { usersRouter } = require('./routes/users.route');

const app = express();

app.use(express.json());

const PORT = 4001;

app.listen(PORT, () => console.log(`DataBase running in port: ${PORT}`));

const { db } = require('./utils/database');

db.authenticate()
    .then(() => console.log('DataBase authenticated succesfully'))
    .catch(error => console.log(error));

db.sync()
    .then(() => console.log('DataBase sync succesfully'))
    .catch(error => console.log(error));

//ROUTES

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);


