const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())                 //Parses incoming JSON http-requests (JSON String to javaScript object) and stores the parsed data in req.body.

// Second Step -
// Connect to MongoDB
connectDB();


// Use routes
app.use('/', authRoutes);               //that means the routes we have defined '/register' and '/login' will work on '/register','/login'.


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
