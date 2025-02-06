import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const result = await usersCollection.insertOne({ username, password: hashedPassword });

        return NextResponse.json({ message: "User registered successfully", userId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

