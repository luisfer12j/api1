const { body, validationResult } = require('express-validator');

const createUserValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
    body('password').notEmpty().withMessage('Password cannot be empty').isLength({ min: 8 }).withMessage('Password must be a least 8 charect'),
]

const createRepairValidations = [
    body('date').notEmpty().withMessage('Date cannot be empty'),
    body('computerNumber').notEmpty().withMessage('Computer number cannot be empty'),
    body('comments').notEmpty().withMessage('Comments cannot be empty')
]

const errorValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg)
        const errorMsg = messages.join('. ');
        return res.status(400).json({ status: 'error', message: errorMsg });
    }
    next();
}

module.exports = { createRepairValidations, createUserValidations, errorValidations }

