import dbConnect from './server';
import Car from './models/car';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const authenticate = (request: Request) => {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) throw new Error('Access denied');
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT secret is not defined');
  return jwt.verify(token, secret) as jwt.JwtPayload;
};

export async function handler(request: Request) {
  await dbConnect();

  try {
    const user = authenticate(request);

    // Handling POST and GET methods
    if (request.method === 'POST') {
      const { make, model, color, doorCount, isConvertible, engineSize } = await request.json();
      const car = new Car({
        userId: (user as jwt.JwtPayload).id,
        make,
        model,
        color,
        doorCount,
        isConvertible,
        engineSize,
      });
      await car.save();
      return NextResponse.json(car, { status: 201 });
    } else if (request.method === 'GET') {
      const cars = await Car.find({ userId: user.id });
      return NextResponse.json(cars);
    }

    // Handling PUT and DELETE methods
    if (request.method === 'PUT' || request.method === 'DELETE') {
      const id = new URL(request.url).searchParams.get('id');
      const car = await Car.findById(id);

      if (!car || car.userId.toString() !== user.id) {
        return NextResponse.json({ message: 'Car not found or unauthorized' }, { status: 404 });
      }

      if (request.method === 'PUT') {
        const updatedCar = await Car.findByIdAndUpdate(id, await request.json(), { new: true });
        return NextResponse.json(updatedCar);
      } else if (request.method === 'DELETE') {
        await Car.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Car deleted' });
      }
    }

    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
