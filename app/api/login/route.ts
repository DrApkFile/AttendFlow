import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/models/User"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const user = await db.collection<User>("users").findOne({ username })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" })

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

