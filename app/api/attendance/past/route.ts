import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/api/attendance/past", {
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: "Failed to fetch past attendances" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching past attendances:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

