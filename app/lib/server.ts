import mongoose from 'mongoose';
import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const client = new MongoClient(MONGO_URI);
let dbInstance: Db | null = null; // Cache the DB instance

export async function connectToDatabase(): Promise<Db> {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db("car_garage_database"); // Replace with your actual DB name
  }
  return dbInstance;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI as string)
    .then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;