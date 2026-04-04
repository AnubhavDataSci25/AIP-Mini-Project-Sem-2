const mongoose = require('mongoose');

/**
 * Establishing connection to MongoDB using Mongoose.
 * Environment variables should be used for production URI.
 */
const connectDB = async () => {
    try {
        // Replace with your MongoDB connection string if running locally or via Atlas
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/job_portal', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;