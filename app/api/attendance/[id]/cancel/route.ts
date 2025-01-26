import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`http://localhost:5000/api/attendance/${params.id}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ message: "Attendance cancelled successfully" })
    } else {
      return NextResponse.json({ message: "Failed to cancel attendance" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error cancelling attendance:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

