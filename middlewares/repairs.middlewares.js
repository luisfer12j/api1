const { Repair } = require('../models/repair.model');

const validRepair = async (req, res, next) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({ where: { id } });
        if (!repair) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the repair' })
        }
        if (repair.status === 'pending') {
            req.repair = repair;
            next();
        } else {
            return res.status(404).json({ status: 'Not found', message: 'This repair is not availible' })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' })
    }

}


module.exports = { validRepair }