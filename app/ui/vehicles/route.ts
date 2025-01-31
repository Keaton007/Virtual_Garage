import { connectToDatabase } from "@/lib/data";
import Vehicle from "@/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Check for Authorization Header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching vehicles" }, { status: 500 });
  }
}
