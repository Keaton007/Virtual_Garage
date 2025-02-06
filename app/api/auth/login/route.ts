import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Find user
        const user = await usersCollection.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT Token
        const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
