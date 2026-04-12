const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:gigId', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.put('/:id', protect, updateOrderStatus);

module.exports = router;