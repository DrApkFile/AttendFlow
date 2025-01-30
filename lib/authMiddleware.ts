import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

export function authMiddleware(handler: Function) {
  return async (req: Request) => {
    try {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
      req.userId = new ObjectId(decoded.userId)

      return handler(req)
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }
}

