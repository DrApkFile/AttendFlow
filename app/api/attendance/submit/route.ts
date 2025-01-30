import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Attendance } from "@/models/Attendance"

export async function POST(req: Request) {
  try {
    const { linkId, username } = await req.json()
    const client = await clientPromise
    const db = client.db("courseRepAttendance")

    const attendance = await db.collection<Attendance>("attendances").findOne({ linkId })

    if (!attendance) {
      return NextResponse.json({ error: "Invalid attendance link" }, { status: 400 })
    }

    if (new Date() > attendance.expiresAt) {
      return NextResponse.json({ error: "Attendance link has expired" }, { status: 400 })
    }

    await db
      .collection<Attendance>("attendances")
      .updateOne({ linkId }, { $push: { submissions: { username, submittedAt: new Date() } } })

    return NextResponse.json({ message: "Attendance submitted successfully" })
  } catch (error) {
    console.error("Error submitting attendance:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

