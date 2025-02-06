import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", "authToken=; HttpOnly; Path=/; Max-Age=0");
    res.json({ message: "Logged out" });
}
