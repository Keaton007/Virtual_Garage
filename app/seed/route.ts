import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../lib/mongodb';
import { User } from '../lib/definitions';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'POST': // Login or Register logic
      const { action, email, password, name } = req.body;

      if (action === 'register') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();
        return res.status(201).json({ message: 'User created' });
      }

      if (action === 'login') {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
          expiresIn: '1h',
        });
        return res.status(200).json({ token, user });
      }

      return res.status(400).json({ message: 'Invalid action' });

    default:
      return res.status(405).end(); // Method not allowed
  }
}
