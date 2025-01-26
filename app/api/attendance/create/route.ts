import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = await fetch("http://localhost:5000/api/attendance/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ message: "Failed to create attendance" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating attendance:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

