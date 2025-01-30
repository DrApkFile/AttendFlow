import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/models/User"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const existingUser = await db.collection<User>("users").findOne({ username })

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = {
      username,
      password: hashedPassword,
      isDarkMode: false,
    }

    await db.collection<User>("users").insertOne(newUser)

    return NextResponse.json({ message: "User registered successfully" })
  } catch (error) {
    console.error("Error during registration:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

