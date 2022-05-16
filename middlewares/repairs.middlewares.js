const { Repair } = require('../models/repair.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { User } = require('../models/user.model')

const validRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id }, include: [{ model: User }] });
    if (!repair) {
        return next(new AppError('Repaer does not exist with given id', 404))
    }
    if (repair.status === 'pending') {
        req.repair = repair;
        next();
    } else {
        return next(new AppError('This repair is not availible', 404))
    }
})


module.exports = { validRepair }