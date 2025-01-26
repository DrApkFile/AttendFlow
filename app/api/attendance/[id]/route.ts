import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`http://localhost:5000/api/attendance/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ message: "Attendance deleted successfully" })
    } else {
      return NextResponse.json({ message: "Failed to delete attendance" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error deleting attendance:", error)
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}

