import dbConnect from './server';
import Car from './models.ts/car';
import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

const authenticate = (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new Error('Access denied');
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT secret is not defined');
  return jwt.verify(token, secret) as jwt.JwtPayload;
};

export default async function handler(req: Request, res: Response) {
  await dbConnect();

  try {
    const user = authenticate(req);

    if (req.method === 'POST') {
      const { make, model, color, doorCount, isConvertible, engineSize } = req.body;
      const car = new Car({ userId: (user as jwt.JwtPayload).id, make, model, color, doorCount, isConvertible, engineSize });
      await car.save();
      return res.status(201).json(car);
    } else if (req.method === 'GET') {
      const cars = await Car.find({ userId: user.id });
      return res.json(cars);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: 'An unknown error occurred' });
    }
  }

  try {
    const user = authenticate(req);

    if (req.method === 'PUT') {
      const { id } = req.params;
      const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
      if (!car || car.userId.toString() !== user.id) {
        return res.status(404).json({ message: 'Car not found or unauthorized' });
      }
      return res.json(car);
    } else if (req.method === 'DELETE') {
      const { id } = req.params;
      const car = await Car.findByIdAndDelete(id);
      if (!car || car.userId.toString() !== user.id) {
        return res.status(404).json({ message: 'Car not found or unauthorized' });
      }
      return res.json({ message: 'Car deleted' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: 'An unknown error occurred' });
    }
  }
}
