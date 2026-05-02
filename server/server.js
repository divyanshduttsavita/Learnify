// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnify';

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static frontend files from the parent directory
// app.use(express.static(path.join(__dirname, '')));

// // Routes
// app.use('/api/auth', authRoutes);

// // Fallback for static files
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'));
// });

// // Connect to MongoDB and start server
// mongoose.connect(MONGODB_URI)
//     .then(() => {
//         console.log('Connected to MongoDB successfully');
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error.message);
//         console.log('Ensure MongoDB is running locally or provide a valid MONGODB_URI in .env');
//     });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Serve frontend (ONLY for production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// DB connection
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnify';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));