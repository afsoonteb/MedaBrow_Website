const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db/connectDB');
const { authRouter, userRouter, adminRouter } = require('./routers/routers');


// Load env vars
dotenv.config({ path: './config/config.env' });
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

