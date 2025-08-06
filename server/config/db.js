import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Connected to Development MongoDB 😎`);
    }else{
      console.log(`Connected to Test MongoDB 😎`);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


export const connectTestDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Connected to Development MongoDB 😎`);
    }else{
      console.log(`Connected to Test MongoDB 😎`);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (process.env.NODE_ENV !== 'test') {
      console.log('Disconnected from Development MongoDB 😌');
    }else{
      console.log('Disconnected from Test MongoDB 😌');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
