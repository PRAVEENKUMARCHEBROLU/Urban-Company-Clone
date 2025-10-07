const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

const connectDB = require('./config/db');
dotenv.config();

//initialize express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

app.use('/api/auth', require('./routes/authroute'));
app.use('/api/admin', require('./routes/adminroute'));
app.use('/api/user', require('./routes/userroute'));
app.use('/api/provider', require('./routes/providerroute'));
app.use('/api/service', require('./routes/serviceroute'));
app.use('/api/booking', require('./routes/bookingroute'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
