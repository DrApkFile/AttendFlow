import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/models/User"
import { authMiddleware } from "@/lib/authMiddleware"
import type { ObjectId } from "mongodb"

export const GET = authMiddleware(async (req: Request) => {
  try {
    const userId = req.userId as ObjectId
    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const user = await db.collection<User>("users").findOne({ _id: userId }, { projection: { password: 0 } })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user settings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
})

export const PUT = authMiddleware(async (req: Request) => {
  try {
    const { username, password, isDarkMode } = await req.json()
    const userId = req.userId as ObjectId

    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const updateData: Partial<User> = {}

    if (username) {
      const existingUser = await db.collection<User>("users").findOne({ username, _id: { $ne: userId } })
      if (existingUser) {
        return NextResponse.json({ error: "Username already exists" }, { status: 400 })
      }
      updateData.username = username
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    if (typeof isDarkMode === "boolean") {
      updateData.isDarkMode = isDarkMode
    }

    await db.collection<User>("users").updateOne({ _id: userId }, { $set: updateData })

    return NextResponse.json({ message: "User settings updated successfully" })
  } catch (error) {
    console.error("Error updating user settings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
})

