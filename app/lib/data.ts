import mongoose from 'mongoose';
import 'dotenv/config';


const MONGO_URI = process.env.MONGO_URI || '';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGO_URI);
  isConnected = !!db.connections[0].readyState;
  console.log('Connected to MongoDB');
}
