const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'luisfer12j',
    database: 'api1',
    logging: false
})

module.exports = { db };