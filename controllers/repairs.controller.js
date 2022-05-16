const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');


const getAllRepairs = catchAsync(async (req, res, next) => {
    const repairs = await Repair.findAll({
        where: { status: 'pending' },
        include: [{ model: User }]
    });
    res.status(200).json({ repairs });
})

const createRepair = catchAsync(async (req, res, next) => {
    const { sesionUser } = req;
    const { date, computerNumber, comments } = (req.body);
    const newRepair = await Repair.create({ date, computerNumber, comments, userId: sesionUser.id });
    res.status(201).json({ newRepair });
})

const getRepairById = catchAsync(async (req, res, next) => {
    const { repair } = req;
    res.status(200).json({ repair })
})

const updateRepair = catchAsync(async (req, res, next) => {
    const { repair } = req;
    await repair.update({ status: 'completed' });
    await repair.save();
    res.status(200).json({ status: 'success', message: 'Repair completed succesfully!' });
})

const deleteRepair = catchAsync(async (req, res, next) => {
    const { repair } = req
    await repair.update({ status: 'cancelled' });
    await repair.save();
    res.status(200).json({ status: 'success', message: 'Repair cancelled succesfully!' });
})

module.exports = { getAllRepairs, createRepair, getRepairById, updateRepair, deleteRepair }