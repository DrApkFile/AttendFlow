import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const response = await fetch(`http://localhost:5000/api/attendance/${params.id}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return NextResponse.json({ message: "Attendance recorded successfully" })
    } else {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.message || "Failed to record attendance" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error submitting attendance:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

