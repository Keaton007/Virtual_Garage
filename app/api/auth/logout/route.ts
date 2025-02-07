import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get("cookie");
    const authToken = cookies?.split(';').find(c => c.trim().startsWith('authToken='));

    if (authToken) {
      return NextResponse.json({ message: "Logged out" }, {
        headers: {
          "Set-Cookie": "authToken=; HttpOnly; Path=/; Max-Age=0"
        }
      });
    }

    return NextResponse.json({ message: "No active session found" }, { status: 400 });

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
