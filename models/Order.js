// Import Mongoose
const mongoose = require('mongoose');

// Schema for individual order items
const orderItemSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

// Main Order Schema
const orderSchema = new mongoose.Schema({

    // Reference to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Array of products in the order
    items: [orderItemSchema],

    // Total order amount
    total: {
        type: Number,
        required: true,
        min: 0
    },

    // Order status with default value
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true });

// Create and export Order model
const order = mongoose.model('Order', orderSchema);

module.exports = order;