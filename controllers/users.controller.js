const { User } = require('../models/user.model');
const { validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = (req.body)
        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({ newUser });

    } catch (error) {
        if (error.name = 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: 'error', message: 'Already exist a user with this email' })
        }
        res.status(404).json({ status: 'Fatal error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const { user } = req;

        res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { user } = req;
        const { name, email } = req.body;
        await user.update({ name, email });
        await user.save();
        res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { user } = req;

        await user.update({ status: 'disable' });
        await user.save();
        res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' });
    }
}

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser }