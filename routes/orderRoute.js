const express = require('express');
const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

// Create an order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get a single order by ID
router.get('/:id', getOrderById);

// Update an order
router.patch('/:id', updateOrder);

// Delete an order
router.delete('/:id', deleteOrder);

module.exports = router;