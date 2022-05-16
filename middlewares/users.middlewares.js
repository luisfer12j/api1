const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');

const protectToken = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Session invalid', 403));
    }
    //Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id }, status: 'availible' });
    if (!user) {
        return next(new AppError('This account is not availible', 403));
    }
    // user.password = undefined;
    req.sesionUser = user;
    next();
})

const validUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    if (!user) {
        return next(new AppError('User does not exist with given id', 404))
        // return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
    }
    if (user.status === 'availible') {
        req.user = user;
        next();
    } else {
        return next(new AppError('User does not availible', 404))
        // return res.status(404).json({ status: 'Not found', message: 'This user is not availible' })
    }
})

const protectEmployee = catchAsync(async (req, res, next) => {
    if (req.sesionUser.role !== 'employee') {
        return next(new AppError('Access denied', 403));
    }
    next();
})

const validUserId = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (req.sesionUser.id !== parseInt(id)) {
        return next(new AppError('This action is not availible', 403));
    }
    next();
})

module.exports = { validUser, protectToken, protectEmployee, validUserId };