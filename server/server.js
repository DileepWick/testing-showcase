import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';

// Load environment variables
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config(); // Load default .env
}

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB(process.env.MONGO_URI);


// Routes
app.use('/api', bookRoutes);

// Start the server
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Connected to Development Server: http://localhost:${port} 😊`);
  }else{
    console.log(`Connected to Test Server: http://localhost:${port} 😊`);
  }
});

// Export the server for tests
export const closeServer = () => {
  server.close();
};

export default app;
