import dbConnect from './server';
import Car from './models/car';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Authentication function
const authenticate = (request: Request) => {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) throw new Error('Access denied');
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT secret is not defined');
  return jwt.verify(token, secret) as jwt.JwtPayload;
};

// **GET request handler**
export async function GET(request: Request) {
  await dbConnect();
  try {
    const user = authenticate(request);
    const cars = await Car.find({ userId: user.id });
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 401 });
  }
}

// **POST request handler**
export async function POST(request: Request) {
  await dbConnect();
  try {
    const user = authenticate(request);
    const { make, model, color, doorCount, isConvertible, engineSize } = await request.json();

    const car = new Car({
      userId: user.id,
      make,
      model,
      color,
      doorCount,
      isConvertible,
      engineSize,
    });

    await car.save();
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

// **PUT request handler**
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const user = authenticate(request);
    const id = new URL(request.url).searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'Missing car ID' }, { status: 400 });

    const car = await Car.findById(id);
    if (!car || car.userId.toString() !== user.id) {
      return NextResponse.json({ message: 'Car not found or unauthorized' }, { status: 404 });
    }

    const updatedCar = await Car.findByIdAndUpdate(id, await request.json(), { new: true });
    return NextResponse.json(updatedCar);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

// **DELETE request handler**
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const user = authenticate(request);
    const id = new URL(request.url).searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'Missing car ID' }, { status: 400 });

    const car = await Car.findById(id);
    if (!car || car.userId.toString() !== user.id) {
      return NextResponse.json({ message: 'Car not found or unauthorized' }, { status: 404 });
    }

    await Car.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Car deleted' });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}
