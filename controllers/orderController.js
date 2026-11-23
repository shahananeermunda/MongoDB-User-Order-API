const Order=require('../models/Order')
const User=require('../models/User')

// Create Order – POST
const createOrder = async (req, res, next) => {
    try {
        const {userId, items } = req.body;

        // Check whether user exists
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }

        // Calculate total
        const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Create order
        const order = await Order.create({
            user: userId,
            items,
            total
        });

        // Get user details
        const populated = await order.populate('user', 'name email');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: populated
        });

    } catch (err) {
        next(err);
    }
};

// Get All Orders – GET
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (err) {
        next(err);
    }
};

// Get Single Order – GET
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email');

        if (!order) {
            const err = new Error('Order not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (err) {
        next(err);
    }
};

// PATCH /api/orders/:id
const updateOrder = async (req, res, next) => {
    try {
        const { status, items } = req.body;

        const updateData = {};

        if (status) {
            updateData.status = status;
        }

        if (items) {
            updateData.items = items;

            // Recalculate total if items change
            updateData.total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        if (!order) {
            const err = new Error('Order not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: order
        });

    } catch (err) {
        next(err);
    }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            const err = new Error('Order not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });

    } catch (err) {
        next(err);
    }
};

// GET /api/users/:id/orders
const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.params.id
        })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getUserOrders
};