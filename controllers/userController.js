
const User = require('../models/User');

// GET /api/users
const getUsers = async (req, res, next) => {
    try {
        const filter = req.query.role ? { role: req.query.role } : {};

        const users = await User.find(filter).select("name email");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (err) {
        next(err);
    }
};

// POST /api/users
const createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (err) {
        next(err);
    }
};

// GET /api/users/:id
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        next(err);
    }
};

// PATCH /api/users/:id
const updateUser = async (req, res, next) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {
        next(err);
    }
};

// DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);

        if (!deleted) {
            const err = new Error('User not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deleted
        });

    } catch (err) {
        next(err);
    }
};

// Export controllers
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
