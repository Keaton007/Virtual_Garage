import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/data';
import User from '../lib/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// **POST request handler**
export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { action, email, password, name } = await request.json();

    if (action === 'register') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, name });
      await newUser.save();
      return NextResponse.json({ message: 'User created' }, { status: 201 });
    }

    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
      });
      return NextResponse.json({ token, user });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
