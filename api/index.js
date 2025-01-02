import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';



dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes path
app.use('/api/users', userRouter);




// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

const PORT = process.env.PORT || 2000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or use a different one.`);
    process.exit(1);
  } else {
    console.error('An unexpected error occurred:', err);
  }
});