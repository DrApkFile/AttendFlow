import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Attendance } from "@/models/Attendance"
import { authMiddleware } from "@/lib/authMiddleware"

export const GET = authMiddleware(async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const linkId = searchParams.get("linkId")

    if (!linkId) {
      return NextResponse.json({ error: "Missing linkId parameter" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const attendance = await db.collection<Attendance>("attendances").findOne({ linkId })

    if (!attendance) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 })
    }

    return NextResponse.json(attendance)
  } catch (error) {
    console.error("Error downloading attendance:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
})

