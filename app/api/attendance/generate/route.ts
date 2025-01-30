import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import clientPromise from "@/lib/mongodb"
import type { Attendance } from "@/models/Attendance"
import { authMiddleware } from "@/lib/authMiddleware"

export const POST = authMiddleware(async (req: Request) => {
  try {
    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const linkId = uuidv4()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 15 * 60000) // 15 minutes from now

    const newAttendance: Attendance = {
      linkId,
      createdAt: now,
      expiresAt,
      submissions: [],
    }

    await db.collection<Attendance>("attendances").insertOne(newAttendance)

    return NextResponse.json({ linkId })
  } catch (error) {
    console.error("Error generating attendance link:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
})

