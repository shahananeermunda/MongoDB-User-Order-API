
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(logger);

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Express API running' });
});

// User routes
app.use('/api/users', userRoutes);
//Order Routes
app.use('/api/orders', orderRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

//Mongodb connection and port listen
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection failed:', err.message);
        process.exit(1);
    });