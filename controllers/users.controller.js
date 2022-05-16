const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users });

});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = (req.body)
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({ name, email, password: hashPassword, role });
    newUser.password = undefined;
    res.status(201).json({ newUser });
})

const getUserById = catchAsync(async (req, res, next) => {
    const { user } = req;
    res.status(200).json({ user })
})

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });
    await user.save();
    res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
})

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    await user.update({ status: 'disable' });
    await user.save();
    res.status(200).json({ status: 'success', message: 'User updated succesfully!' });
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //Validate that user exist with given email
    const user = await User.findOne({ where: { email, status: 'availible' } });

    //Compare password with DB
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credential', 400));
    }
    user.password = undefined;
    //Generate Json Web Token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ token, user })
})

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser, login }