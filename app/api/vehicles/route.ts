import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const db = await connectToDatabase();
    const vehiclesCollection = db.collection("vehicles");
    const vehicles = await vehiclesCollection.find({ userId: decoded.id }).toArray();

    return NextResponse.json(vehicles);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}