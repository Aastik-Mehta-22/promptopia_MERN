
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import promptRoutes from './routes/prompts.js';


// Load the env variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/prompts', promptRoutes);


// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

// Start the server
async function startServer() {
 try {

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
 } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1); // Exit the process with failure
 }
}

startServer();