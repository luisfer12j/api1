const { enable } = require('express/lib/application');
const { User } = require('../models/user.model');

const validUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return res.status(404).json({ status: 'Not found', message: 'Can not find the user' })
        }
        if (user.status === 'availible') {
            req.user = user;
            next();
        } else {
            return res.status(404).json({ status: 'Not found', message: 'This user is not availible' })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Fatal error' })
    }
}

module.exports = { validUser };