const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'availible'
    },
});

module.exports = { User }