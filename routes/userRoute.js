
const express = require('express');

const router = express.Router();
const { getUserOrders } = require('../controllers/orderController');

const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// GET all notes
router.get('/', getUsers);

// GET note by ID
router.get('/:id', getUserById);

// POST create note
router.post('/', createUser);

// PUT update note
router.put('/:id', updateUser);

// DELETE note
router.delete('/:id', deleteUser);

//GET users for OrderId
router.get('/:id/orders', getUserOrders);

module.exports = router;
