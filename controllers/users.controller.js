const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error)
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = (req.body)
        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({ newUser });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
        }

        res.status(200).json({ user })
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
        }
        await user.update({ name, email });
        await user.save();
        res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
        }
        await user.update({ status: 'disable' });
        await user.save();
        res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser }