// routes/transactions.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware');
const Transaction = require('../models/Transaction'); // Make sure this path is correct
const User = require('../models/User');

router.get('/', authMiddleware, async (req, res) => {

    try {
        const transactions = await Transaction.find({ userId: req.user.userId })
            .populate({
                path: 'appointmentId',
                populate: {
                    path: 'doctorId',
                    select: 'name specialization'
                }
            })
            .sort('-createdAt');

        res.json({
            message: 'Transactions retrieved successfully',
            transactions
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching transactions',
            error: error.message
        });
    }
});



module.exports = router;