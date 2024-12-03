const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();
app.use(express.json());

// Your routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
